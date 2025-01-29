import express from "express";
import { getSystemLogs_controller } from "../systemLog.controller";
import { QuerySystemLogValidator } from "../validators/systemLog.validator";

const router = express.Router();

router.get("/", QuerySystemLogValidator, getSystemLogs_controller);

export default router;
