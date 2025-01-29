import { Router } from "express";
import defaultRoutes from "./common/routes/default.routes";
import userRoutes from "./auth/routes/user.routes";
import employeeRoutes from "./employee/routes/employee.routes";
import nucleoRoutes from "./nucleos/routes/nucleo.routes";
import sedeRoutes from "./nucleos/sedes/routes/sede.routes";
import programaRoutes from "./programas/routes/programa.routes";
import catedraRoutes from "./programas/catedras/routes/catedra.routes";
import fiamRoutes from "./employee/fiam/routes/fiam.routes";
import studentRoutes from "./student/routes/student.routes";
import representativeRoutes from "./representative/routes/representative.routes";
import furnitureRoutes from "./furniture/routes/furniture.routes";
import instrumentRoutes from "./instrument/routes/instrument.routes";
import comodatoRoutes from "./comodato/routes/comodato.routes";
import enrollmentPeriodRoutes from "./enrollmentPeriod/routes/enrollmentPeriod.routes";
import studentEnrollmentRoutes from "./studentEnrollment/routes/studentEnrollment.routes";
import systemLogRoutes from "./systemLog/routes/systemLog.routes";
import { verifyToken } from "./auth/middlewares/authJwt.middleware";

const allRouters = Router();

allRouters.use("/api/user", userRoutes);
allRouters.use("/api/employee", verifyToken, employeeRoutes);
allRouters.use("/api/nucleo", verifyToken, nucleoRoutes);
allRouters.use("/api/sede", verifyToken, sedeRoutes);
allRouters.use("/api/programa", verifyToken, programaRoutes);
allRouters.use("/api/catedra", verifyToken, catedraRoutes);
allRouters.use("/api/fiam", verifyToken, fiamRoutes);
allRouters.use("/api/student", verifyToken, studentRoutes);
allRouters.use("/api/representative", verifyToken, representativeRoutes);
allRouters.use("/api/furniture", verifyToken, furnitureRoutes);
allRouters.use("/api/instrument", verifyToken, instrumentRoutes);
allRouters.use("/api/comodato", verifyToken, comodatoRoutes);
allRouters.use("/api/enrollment_period", verifyToken, enrollmentPeriodRoutes);
allRouters.use("/api/student_enrollment", verifyToken, studentEnrollmentRoutes);
allRouters.use("/api/system_log", verifyToken, systemLogRoutes);

allRouters.use(defaultRoutes);

export default allRouters;
