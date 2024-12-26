import express from "express";
import {
	createStudent_controller,
	deleteStudent_controller,
	getStudents_controller,
	getOneStudent_controller,
	updateStudent_controller,
	createStudentRelation_controller,
	updateStudentRelation_controller,
	deleteStudentRelation_controller,
	getStudentRelations_controller,
} from "../student.controller";

import {
	QueryStudentValidator,
	StudentValidator,
} from "../validators/student.validator";

import {
	QueryStudentRelationValidator,
	StudentRelationValidator as StudentRelationValidator,
	UpdateStudentRelationValidator,
} from "../validators/studentRelation.validator";

const router = express.Router();

router.post(
	"/relation",
	StudentRelationValidator,
	createStudentRelation_controller
);

router.get(
	"/relation",
	QueryStudentRelationValidator,
	getStudentRelations_controller
);

router.put(
	"/relation/:id",
	UpdateStudentRelationValidator,
	updateStudentRelation_controller
);

router.delete("/relation/:id", deleteStudentRelation_controller);

router.post("/", StudentValidator, createStudent_controller);
router.get("/", QueryStudentValidator, getStudents_controller);
router.get("/:id", getOneStudent_controller);
router.put("/:id", StudentValidator, updateStudent_controller);
router.delete("/:id", deleteStudent_controller);

export default router;
