import mongoose, { Schema } from "mongoose";
import type { Document } from "mongoose";

export interface ITask extends Document {
  name: string;
  description: string;
}

export const TackSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
});

const Task = mongoose.model<ITask>("Task", TackSchema);

export default Task;
