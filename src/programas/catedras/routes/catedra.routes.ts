import express from "express";
import {
	createCatedra_controller,
	deleteCatedra_controller,
	getCatedras_controller,
	getOneCatedra_controller,
	updateCatedra_controller,
} from "../catedra.controller";

const router = express.Router();

router.post("/", createCatedra_controller);
router.get("/", getCatedras_controller);
router.get("/:id", getOneCatedra_controller);
router.put("/:id", updateCatedra_controller);
router.delete("/:id", deleteCatedra_controller);

export default router;
