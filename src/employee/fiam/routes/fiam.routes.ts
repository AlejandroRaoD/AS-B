import express from "express";
import {
	createFiam_controller,
	deleteFiam_controller,
	getFiams_controller,
	getOneFiam_controller,
	updateFiam_controller,
} from "../fiam.controller";
import {
	FiamValidator,
	QueryFiamValidator,
} from "../validators/fiam.validator";

const router = express.Router();

router.post("/", FiamValidator, createFiam_controller);
router.get("/", QueryFiamValidator, getFiams_controller);
router.get("/:id", getOneFiam_controller);
router.put("/:id", FiamValidator, updateFiam_controller);
router.delete("/:id", deleteFiam_controller);

export default router;
