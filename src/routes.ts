import { Router } from "express";
import defaultRoutes from "./common/routes/default.routes";
import userRoutes from "./auth/routes/user.routes";
import employeeRoutes from "./employee/routes/employee.routes";
import nucleoRoutes from "./nucleos/routes/nucleo.routes";
import sedeRoutes from "./nucleos/sedes/routes/sede.routes";
import programaRoutes from "./programas/routes/programa.routes";
import catedraRoutes from "./programas/catedras/routes/catedra.routes";

const allRouters = Router();

allRouters.use("/api/user", userRoutes);
allRouters.use("/api/employee", employeeRoutes);

allRouters.use("/api/nucleo", nucleoRoutes);
allRouters.use("/api/sede", sedeRoutes);
allRouters.use("/api/programa", programaRoutes);
allRouters.use("/api/catedra", catedraRoutes);
allRouters.use(defaultRoutes);

export default allRouters;
