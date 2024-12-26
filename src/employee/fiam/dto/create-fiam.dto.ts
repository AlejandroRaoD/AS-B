import { fiamAttributes } from "../models/fiam.model";

export interface CreateFiamDto
	extends Omit<fiamAttributes, "_id" | "status"> {}
