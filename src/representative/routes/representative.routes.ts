import express from "express";
import {
	createRepresentative_controller,
	deleteRepresentative_controller,
	getRepresentatives_controller,
	getOneRepresentative_controller,
	updateRepresentative_controller,
} from "../representative.controller";

const router = express.Router();

router.post("/", createRepresentative_controller);
router.get("/", getRepresentatives_controller);
router.get("/:id", getOneRepresentative_controller);
router.put("/:id", updateRepresentative_controller);
router.delete("/:id", deleteRepresentative_controller);

export default router;
