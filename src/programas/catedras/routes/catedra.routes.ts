import express from "express";
import {
	createCatedra_controller,
	deleteCatedra_controller,
	getCatedras_controller,
	getOneCatedra_controller,
	updateCatedra_controller,
} from "../catedra.controller";
import {
	CreateCatedraValidator,
	QueryCatedraValidator,
	UpdateCatedraValidator,
} from "../validators/catedra.validator";

const router = express.Router();

router.post("/", CreateCatedraValidator, createCatedra_controller);
router.get("/", QueryCatedraValidator, getCatedras_controller);
router.get("/:id", getOneCatedra_controller);
router.put("/:id", UpdateCatedraValidator, updateCatedra_controller);
router.delete("/:id", deleteCatedra_controller);

export default router;
