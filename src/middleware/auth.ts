import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

process.loadEnvFile();

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const error = new Error("Unauthorized");
    res.status(401).json({ error: error.message });
    return;
  }

  const [, token] = bearer.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findById(decoded.id).select("_id name email");
      if (user) {
        req.user = user;
      } else {
        res.status(500).json({ error: "Invalid token" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Invalid token" });
    return;
  }

  next();
  return;
};
