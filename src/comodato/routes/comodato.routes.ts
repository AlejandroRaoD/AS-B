import express from "express";
import {
	createComodato_controller,
	deleteComodato_controller,
	getComodatos_controller,
	getOneComodato_controller,
	updateComodato_controller,
} from "../comodato.controller";

const router = express.Router();

router.post("/", createComodato_controller);
router.get("/", getComodatos_controller);
router.get("/:id", getOneComodato_controller);
router.put("/:id", updateComodato_controller);
router.delete("/:id", deleteComodato_controller);

export default router;
