import { ComodatoAttributes } from "../models/comodato.model";

export interface CreateComodatoDto
	extends Omit<ComodatoAttributes, "_id" | "status"> {}
