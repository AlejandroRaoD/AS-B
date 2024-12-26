import { representativeAttributes } from "../models/representative.model";

export interface CreateRepresentativeDto
	extends Omit<representativeAttributes, "_id" | "status"> {}
