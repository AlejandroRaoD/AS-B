import express, { urlencoded } from "express";
import cors from "cors";
import allRouters from "./routes";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { NODE_ENV } from "./config";

const app = express();

if (NODE_ENV == "dev") app.use(logger("dev"));

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use(allRouters);

export default app;
