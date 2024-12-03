import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
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
        res.status(404).json({ error: error.message });
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
        res.status(404).json({ error: error.message });
        return;
      }
      if (!user.confirmed) {
        const token = new Token();
        token.user = user.id;
        token.token = generateToken();
        await token.save();

        //Send email
        AuthEmail.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token,
        });

        const error = new Error(
          "The account is not confirmed, a confirmation email has been sent.",
        );
        res.status(401).json({ error: error.message });
        return;
      }
      //Check password
      const isPasswordValid = await checkPassword(password, user.password);
      if (!isPasswordValid) {
        const error = new Error("Invalid password");
        res.status(401).json({ error: error.message });
        return;
      }
      res.send("Login success");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static requestConfirmationCode = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      //User exists
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("The user is not registered");
        res.status(404).json({ error: error.message });
        return;
      }

      if (user.confirmed) {
        const error = new Error("The account is already confirmed");
        res.status(409).json({ error: error.message });
        return;
      }

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

      res.send("A new token has been sent to your email");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      //User exists
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("The user is not registered");
        res.status(404).json({ error: error.message });
        return;
      }

      //Generate token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      await token.save();

      //Send email
      AuthEmail.sendPasswordResetToken({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      res.send("Check your email to reset your password");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
