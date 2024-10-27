import { Router } from "express";
import defaultRoutes from "./default.routes";
import userRoutes from "./user.routes";

const allRouters = Router();

allRouters.use(defaultRoutes);
allRouters.use(userRoutes);

export default allRouters;
