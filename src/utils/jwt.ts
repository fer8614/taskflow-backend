import jwt from "jsonwebtoken";
import { Types } from "mongoose";

process.loadEnvFile();

type UserPayload = {
  id: Types.ObjectId;
};

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: "6m",
  });
  return token;
};
