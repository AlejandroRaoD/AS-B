import express from "express";
import {
	createComodato_controller,
	deleteComodato_controller,
	getComodatos_controller,
	getOneComodato_controller,
	updateComodato_controller,
} from "../comodato.controller";
import {
	CreateComodatoValidator,
	QueryComodatoValidator,
	UpdateComodatoValidator,
} from "../validators/comodato.validator";

const router = express.Router();

router.post("/", CreateComodatoValidator, createComodato_controller);
router.get("/", QueryComodatoValidator, getComodatos_controller);
router.get("/:id", getOneComodato_controller);
router.put("/:id", UpdateComodatoValidator, updateComodato_controller);
router.delete("/:id", deleteComodato_controller);

export default router;
