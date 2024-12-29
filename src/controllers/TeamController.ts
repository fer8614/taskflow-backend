import { Request, Response } from "express";
import User from "../models/User";

export class TeamMemberController {
  static findMembersByEmail = async (req: Request, res: Response) => {
    const { email } = req.body;

    //Fond user
    const user = await User.findOne({ email }).select("id email name");
    if (!user) {
      const error = new Error("User not found");
      res.status(404).json({ error: error.message });
      return;
    }

    res.json(user);
  };
}