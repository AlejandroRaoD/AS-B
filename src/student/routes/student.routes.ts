import express from "express";
import {
	createStudent_controller,
	deleteStudent_controller,
	getStudents_controller,
	getOneStudent_controller,
	updateStudent_controller,
} from "../student.controller";

const router = express.Router();

router.post("/", createStudent_controller);
router.get("/", getStudents_controller);
router.get("/:id", getOneStudent_controller);
router.put("/:id", updateStudent_controller);
router.delete("/:id", deleteStudent_controller);

export default router;
