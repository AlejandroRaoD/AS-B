import { furnitureAttributes } from "../models/furniture.model";

export interface CreateFurnitureDto
	extends Omit<furnitureAttributes, "_id" | "status"> {}
