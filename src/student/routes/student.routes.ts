import express from "express";
import {
	createStudent_controller,
	deleteStudent_controller,
	getStudents_controller,
	getOneStudent_controller,
	updateStudent_controller,
} from "../student.controller";
import {
	QueryStudentValidator,
	StudentValidator,
} from "../validators/student.validator";
import {
	QueryStudentRepresentativeValidator,
	StudentRepresentativeValidator,
} from "../validators/studentRepresentative.validator";

const router = express.Router();

router.post(
	"/relation",
	StudentRepresentativeValidator,
	createStudent_controller
);
router.get(
	"/relation",
	QueryStudentRepresentativeValidator,
	getStudents_controller
);
router.get("/relation/:id", getOneStudent_controller);
router.put(
	"/relation/:id",
	StudentRepresentativeValidator,
	updateStudent_controller
);
router.delete("/relation/:id", deleteStudent_controller);

router.post("/", StudentValidator, createStudent_controller);
router.get("/", QueryStudentValidator, getStudents_controller);
router.get("/:id", getOneStudent_controller);
router.put("/:id", StudentValidator, updateStudent_controller);
router.delete("/:id", deleteStudent_controller);

export default router;
