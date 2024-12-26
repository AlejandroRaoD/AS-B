import express from "express";
import {
	createStudentEnrollment_controller,
	deleteStudentEnrollment_controller,
	getStudentEnrollments_controller,
	getOneStudentEnrollment_controller,
	updateStudentEnrollment_controller,
} from "../studentEnrollment.controller";
import {
	QueryStudentEnrollmentValidator,
	StudentEnrollmentValidator,
	UpdateStudentEnrollmentValidator,
} from "../validators/studentEnrollment.validator";

const router = express.Router();

router.post(
	"/",
	StudentEnrollmentValidator,
	createStudentEnrollment_controller
);

router.get(
	"/",
	QueryStudentEnrollmentValidator,
	getStudentEnrollments_controller
);

router.get("/:id", getOneStudentEnrollment_controller);

router.put(
	"/:id",
	UpdateStudentEnrollmentValidator,
	updateStudentEnrollment_controller
);

router.delete("/:id", deleteStudentEnrollment_controller);

export default router;
