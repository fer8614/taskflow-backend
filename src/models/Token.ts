import { create } from "domain";
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IToken extends Document {
  token: string;
  user: Types.ObjectId;
  createdAt: Date;
}

const TokenSchema: Schema = new Schema({
  token: { type: String, required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now, expires: "5m" },
});

const Token = mongoose.model<IToken>("Token", TokenSchema);
export default Token;
