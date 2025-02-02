import { CorsOptions } from "cors";
import dotenv from "dotenv";
dotenv.config();

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whiteList = [process.env.FRONTEND_URL];
    if (process.argv[2] === "--api") {
      whiteList.push(undefined, null);
    }
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
