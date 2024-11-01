import express from "express";
import {
	createEmployee_controller,
	deleteEmployee_controller,
	getEmployees_controller,
	getOneEmployee_controller,
	updateEmployee_controller,
} from "../employee.controller";

const router = express.Router();

router.post("/", createEmployee_controller);
router.get("/", getEmployees_controller);
router.get("/:id", getOneEmployee_controller);
router.put("/:id", updateEmployee_controller);
router.delete("/:id", deleteEmployee_controller);

export default router;
