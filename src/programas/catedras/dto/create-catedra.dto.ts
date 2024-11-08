import { catedraAttributes } from "../models/catedra.model";

export interface CreateCatedraDto
	extends Omit<catedraAttributes, "_id" | "status"> {}
