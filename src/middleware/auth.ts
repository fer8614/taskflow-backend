import { Request, Response, NextFunction } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  console.log(token);

  next();
};
