import mongoose from "mongoose";
import colors from "colors";
import { exit, env } from "node:process";

export const connectDB = async () => {
  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error("DATABASE_URL no está definida");
    }
    const { connection } = await mongoose.connect(databaseUrl);
    const url = `${connection.host}:${connection.port}`;
    console.log(`MongoDB connected: ${url}`.rainbow.underline.bold);
  } catch (error) {
    if (error instanceof Error) {
      // console.log(error.message);
    } else {
      console.log("Error desconocido", error);
    }
  }
};
