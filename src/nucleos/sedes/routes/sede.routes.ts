import express from "express";
import {
	createSede_controller,
	deleteSede_controller,
	getSedes_controller,
	getOneSede_controller,
	updateSede_controller,
} from "../sede.controller";

const router = express.Router();

router.post("/", createSede_controller);
router.get("/", getSedes_controller);
router.get("/:id", getOneSede_controller);
router.put("/:id", updateSede_controller);
router.delete("/:id", deleteSede_controller);

export default router;
