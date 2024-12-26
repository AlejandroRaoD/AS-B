import express from "express";
import {
	createRepresentative_controller,
	deleteRepresentative_controller,
	getRepresentatives_controller,
	getOneRepresentative_controller,
	updateRepresentative_controller,
} from "../representative.controller";

import {
	QueryRepresentativeValidator,
	RepresentativeValidator,
} from "../validators/representative.validator";

const router = express.Router();

router.post("/", RepresentativeValidator, createRepresentative_controller);
router.get("/", QueryRepresentativeValidator, getRepresentatives_controller);
router.get("/:id", getOneRepresentative_controller);
router.put("/:id", RepresentativeValidator, updateRepresentative_controller);
router.delete("/:id", deleteRepresentative_controller);

export default router;
