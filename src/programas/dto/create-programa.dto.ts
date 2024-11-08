import { programaAttributes } from "../models/programa.model";

export interface CreateProgramaDto
	extends Omit<programaAttributes, "_id" | "status"> {}
