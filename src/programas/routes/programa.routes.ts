import express from "express";
import {
	createPrograma_controller,
	deletePrograma_controller,
	getProgramas_controller,
	getOnePrograma_controller,
	updatePrograma_controller,
} from "../programa.controller";

import {
	CreateProgramaValidator,
	QueryProgramaValidator,
	UpdateProgramaValidator,
} from "../validators/programa.validator";

const router = express.Router();

router.post("/", CreateProgramaValidator, createPrograma_controller);
router.get("/", QueryProgramaValidator, getProgramas_controller);
router.get("/:id", getOnePrograma_controller);
router.put("/:id", UpdateProgramaValidator, updatePrograma_controller);
router.delete("/:id", deletePrograma_controller);

export default router;
