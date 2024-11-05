import express from "express";
import {
	createEnrollmentPeriod_controller,
	deleteEnrollmentPeriod_controller,
	getEnrollmentPeriods_controller,
	getOneEnrollmentPeriod_controller,
	updateEnrollmentPeriod_controller,
} from "../enrollmentPeriod.controller";

const router = express.Router();

router.post("/", createEnrollmentPeriod_controller);
router.get("/", getEnrollmentPeriods_controller);
router.get("/:id", getOneEnrollmentPeriod_controller);
router.put("/:id", updateEnrollmentPeriod_controller);
router.delete("/:id", deleteEnrollmentPeriod_controller);

export default router;
