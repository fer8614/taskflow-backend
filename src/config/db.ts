import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.host}:${connection.port}`;
    console.log(`MongoDB connected: ${url}`.rainbow.underline.bold);
  } catch (error) {
    console.log(
      `Error connect to DataBase : ${error.message}`.red.underline.bold,
    );
    exit(1);
  }
};
