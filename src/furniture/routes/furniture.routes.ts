import express from "express";
import {
	createFurniture_controller,
	deleteFurniture_controller,
	getFurnitures_controller,
	getOneFurniture_controller,
	updateFurniture_controller,
} from "../furniture.controller";
import {
	FurnitureValidator,
	QueryFurnitureValidator,
} from "../validators/furniture.validator";

const router = express.Router();

router.post("/", FurnitureValidator, createFurniture_controller);
router.get("/", QueryFurnitureValidator, getFurnitures_controller);
router.get("/:id", getOneFurniture_controller);
router.put("/:id", FurnitureValidator, updateFurniture_controller);
router.delete("/:id", deleteFurniture_controller);

export default router;
