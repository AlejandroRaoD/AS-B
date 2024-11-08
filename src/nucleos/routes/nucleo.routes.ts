import express from "express";
import {
	createNucleo_controller,
	deleteNucleo_controller,
	getNucleos_controller,
	getOneNucleo_controller,
	updateNucleo_controller,
} from "../nucleo.controller";
import {
	NucleoValidator,
	QueryNucleoValidator,
} from "../validators/nucleo.validator";

const router = express.Router();

router.post("/", NucleoValidator, createNucleo_controller);
router.get("/", QueryNucleoValidator, getNucleos_controller);
router.get("/:id", getOneNucleo_controller);
router.put("/:id", NucleoValidator, updateNucleo_controller);
router.delete("/:id", deleteNucleo_controller);

export default router;
