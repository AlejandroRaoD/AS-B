import express from "express";
import {
	createInstrument_controller,
	deleteInstrument_controller,
	getInstruments_controller,
	getOneInstrument_controller,
	updateInstrument_controller,
} from "../instrument.controller";
import {
	InstrumentValidator,
	QueryInstrumentValidator,
} from "../validators/instrument.validator";

const router = express.Router();

router.post("/", InstrumentValidator, createInstrument_controller);
router.get("/", QueryInstrumentValidator, getInstruments_controller);
router.get("/:id", getOneInstrument_controller);
router.put("/:id", InstrumentValidator, updateInstrument_controller);
router.delete("/:id", deleteInstrument_controller);

export default router;
