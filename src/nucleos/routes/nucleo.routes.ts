import express from "express";
import {
	createNucleo_controller,
	deleteNucleo_controller,
	getNucleos_controller,
	getOneNucleo_controller,
	updateNucleo_controller,
} from "../nucleo.controller";

const router = express.Router();

router.post("/", createNucleo_controller);
router.get("/", getNucleos_controller);
router.get("/:id", getOneNucleo_controller);
router.put("/:id", updateNucleo_controller);
router.delete("/:id", deleteNucleo_controller);

export default router;
