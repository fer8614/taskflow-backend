import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body;

      //Prevent duplicates
      const userExists = await User.findOne({ email });
      if (userExists) {
        const error = new Error("User already exists");
        res.status(409).json({ error: error.message });
        return;
      }
      //Create user
      const user = new User(req.body);
      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await hashPassword(password);

      //Generate token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      //Send email
      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      await Promise.allSettled([user.save(), token.save()]);

      res.send("Account created, check your email to confirm");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("Invalid token");
        res.status(401).json({ error: error.message });
        return;
      }

      const user = await User.findById(tokenExists.user);
      user!.confirmed = true;

      await Promise.allSettled([user!.save(), tokenExists.deleteOne()]);
      res.send("Account confirmed correctly");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("User not found");
        res.status(401).json({ error: error.message });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
