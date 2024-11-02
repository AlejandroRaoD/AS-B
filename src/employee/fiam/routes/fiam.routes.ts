import express from "express";
import {
	createFiam_controller,
	deleteFiam_controller,
	getFiams_controller,
	getOneFiam_controller,
	updateFiam_controller,
} from "../fiam.controller";

const router = express.Router();

router.post("/", createFiam_controller);
router.get("/", getFiams_controller);
router.get("/:id", getOneFiam_controller);
router.put("/:id", updateFiam_controller);
router.delete("/:id", deleteFiam_controller);

export default router;
