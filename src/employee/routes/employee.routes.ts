import express from "express";
import {
	createEmployee_controller,
	deleteEmployee_controller,
	getEmployees_controller,
	getOneEmployee_controller,
	updateEmployee_controller,
} from "../employee.controller";
import {
	CreateEmployeeValidator,
	QueryEmployeeValidator,
	UpdateEmployeeValidator,
} from "../validators/employee.validator";

const router = express.Router();

router.post("/", CreateEmployeeValidator, createEmployee_controller);
router.get("/", QueryEmployeeValidator, getEmployees_controller);
router.get("/:id", getOneEmployee_controller);
router.put("/:id", UpdateEmployeeValidator, updateEmployee_controller);
router.delete("/:id", deleteEmployee_controller);

export default router;
