import express from "express";
import {
	createStudentEnrollment_controller,
	deleteStudentEnrollment_controller,
	getStudentEnrollments_controller,
	getOneStudentEnrollment_controller,
	updateStudentEnrollment_controller,
} from "../studentEnrollment.controller";

const router = express.Router();

router.post("/", createStudentEnrollment_controller);
router.get("/", getStudentEnrollments_controller);
router.get("/:id", getOneStudentEnrollment_controller);
router.put("/:id", updateStudentEnrollment_controller);
router.delete("/:id", deleteStudentEnrollment_controller);

export default router;