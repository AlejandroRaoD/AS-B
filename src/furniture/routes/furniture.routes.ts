import express from "express";
import {
	createFurniture_controller,
	deleteFurniture_controller,
	getFurnitures_controller,
	getOneFurniture_controller,
	updateFurniture_controller,
} from "../furniture.controller";

const router = express.Router();

router.post("/", createFurniture_controller);
router.get("/", getFurnitures_controller);
router.get("/:id", getOneFurniture_controller);
router.put("/:id", updateFurniture_controller);
router.delete("/:id", deleteFurniture_controller);

export default router;
