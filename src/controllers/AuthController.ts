import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { transporter } from "../config/nodemailer";

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
      await transporter.sendMail({
        from: "TaskFlow <admin@taskflow.com>",
        to: user.email,
        subject: "TaskFlow - Confirm your email",
        text: "TaskFlow - Confirm your account",
        html: `<p>please click the link to confirm your email: <a href="http://localhost:3000/confirm-email?token=${token.token}">Confirm email</a></p>`,
      });

      await Promise.allSettled([user.save(), token.save()]);

      res.send("Account created, check your email to confirm");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
