import { Router } from "express";
import defaultRoutes from "./default.routes";
import userRoutes from "./user.routes";

const allRouters = Router();

allRouters.use(userRoutes);
allRouters.use(defaultRoutes);

export default allRouters;
