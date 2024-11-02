import express from "express";
import {
	createPrograma_controller,
	deletePrograma_controller,
	getProgramas_controller,
	getOnePrograma_controller,
	updatePrograma_controller,
} from "../programa.controller";

const router = express.Router();

router.post("/", createPrograma_controller);
router.get("/", getProgramas_controller);
router.get("/:id", getOnePrograma_controller);
router.put("/:id", updatePrograma_controller);
router.delete("/:id", deletePrograma_controller);

export default router;
