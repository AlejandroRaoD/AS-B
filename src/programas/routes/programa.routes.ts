import express from "express";
import {
	createPrograma_controller,
	deletePrograma_controller,
	getProgramas_controller,
	getOnePrograma_controller,
	updatePrograma_controller,
} from "../programa.controller";

import {
	ProgramaValidator,
	QueryProgramaValidator,
} from "../validators/programa.validator";

const router = express.Router();

router.post("/", ProgramaValidator, createPrograma_controller);
router.get("/", QueryProgramaValidator, getProgramas_controller);
router.get("/:id", getOnePrograma_controller);
router.put("/:id", ProgramaValidator, updatePrograma_controller);
router.delete("/:id", deletePrograma_controller);

export default router;
