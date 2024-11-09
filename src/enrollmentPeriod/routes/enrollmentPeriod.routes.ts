import express from "express";
import {
	createEnrollmentPeriod_controller,
	deleteEnrollmentPeriod_controller,
	getEnrollmentPeriods_controller,
	getOneEnrollmentPeriod_controller,
	updateEnrollmentPeriod_controller,
} from "../enrollmentPeriod.controller";
import {
	CreateEnrollmentPeriodValidator,
	QueryEnrollmentPeriodValidator,
	UpdateEnrollmentPeriodValidator,
} from "../validators/enrollmentPeriod.validator";

const router = express.Router();

router.post(
	"/",
	CreateEnrollmentPeriodValidator,
	createEnrollmentPeriod_controller
);

router.get(
	"/",
	QueryEnrollmentPeriodValidator,
	getEnrollmentPeriods_controller
);

router.get("/:id", getOneEnrollmentPeriod_controller);

router.put(
	"/:id",
	UpdateEnrollmentPeriodValidator,
	updateEnrollmentPeriod_controller
);

router.delete("/:id", deleteEnrollmentPeriod_controller);

export default router;
