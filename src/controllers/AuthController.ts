import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const user = new User(req.body);
      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await hashPassword(password);
      await user.save();

      res.send("Account created, check your email to confirm");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
