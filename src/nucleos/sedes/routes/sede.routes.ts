import express from "express";
import {
	createSede_controller,
	deleteSede_controller,
	getSedes_controller,
	getOneSede_controller,
	updateSede_controller,
} from "../sede.controller";
import {
	QuerySedeValidator,
	SedeValidator,
	UpdateSedeValidator,
} from "../validators/sede.validator";

const router = express.Router();

router.post("/", SedeValidator, createSede_controller);
router.get("/", QuerySedeValidator, getSedes_controller);
router.get("/:id", getOneSede_controller);
router.put("/:id", UpdateSedeValidator, updateSede_controller);
router.delete("/:id", deleteSede_controller);

export default router;
