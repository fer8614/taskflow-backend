import mongoose, { Schema, Types } from "mongoose";
import type { Document, PopulatedDoc } from "mongoose";
import type { ITask } from "./Task";
import { IUser } from "./User";

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITask & Document>[];
  manager: PopulatedDoc<IUser & Document>;
  team: PopulatedDoc<IUser & Document>[];
}

const ProjectSchema: Schema = new Schema(
  {
    projectName: { type: String, required: true, trim: true },
    clientName: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tasks: [{ type: Types.ObjectId, ref: "Task" }],
    manager: { type: Types.ObjectId, ref: "User" },
    team: [{ type: Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

const Project = mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
