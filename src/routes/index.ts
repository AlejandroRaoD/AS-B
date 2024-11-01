import { Router } from "express";
import defaultRoutes from "./default.routes";
import userRoutes from "./user.routes";
import nucleoRoutes from "./nucleo.routes";

const allRouters = Router();

allRouters.use("/api/nucleo", nucleoRoutes);
allRouters.use("/api/user", userRoutes);
allRouters.use(defaultRoutes);

export default allRouters;
