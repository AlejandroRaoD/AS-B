import express from "express";
import {
	createInstrument_controller,
	deleteInstrument_controller,
	getInstruments_controller,
	getOneInstrument_controller,
	updateInstrument_controller,
} from "../instrument.controller";

const router = express.Router();

router.post("/", createInstrument_controller);
router.get("/", getInstruments_controller);
router.get("/:id", getOneInstrument_controller);
router.put("/:id", updateInstrument_controller);
router.delete("/:id", deleteInstrument_controller);

export default router;
