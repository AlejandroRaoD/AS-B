import { Router } from "express";
import defaultRoutes from "./default.routes";

const allRouters = Router();

allRouters.use(defaultRoutes);

export default allRouters;
