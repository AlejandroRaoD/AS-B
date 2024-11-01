import { Router } from "express";
import defaultRoutes from "./common/routes/default.routes";
import userRoutes from "./auth/routes/user.routes";
import nucleoRoutes from "./nucleos/routes/nucleo.routes";
import sedeRoutes from "./nucleos/sedes/routes/sede.routes";
import employeeRoutes from "./employee/routes/employee.routes";

const allRouters = Router();

allRouters.use("/api/nucleo", nucleoRoutes);
allRouters.use("/api/sede", sedeRoutes);
allRouters.use("/api/employee", employeeRoutes);
allRouters.use("/api/user", userRoutes);
allRouters.use(defaultRoutes);

export default allRouters;
