import express from "express";
import {
	createStudent_controller,
	deleteStudent_controller,
	getStudents_controller,
	getOneStudent_controller,
	updateStudent_controller,
} from "../student.controller";
import {
	CreateStudentValidator,
	QueryStudentValidator,
	UpdateStudentValidator,
} from "../validators/student.validator";

const router = express.Router();

router.post("/", CreateStudentValidator, createStudent_controller);
router.get("/", QueryStudentValidator, getStudents_controller);
router.get("/:id", getOneStudent_controller);
router.put("/:id", UpdateStudentValidator, updateStudent_controller);
router.delete("/:id", deleteStudent_controller);

export default router;
