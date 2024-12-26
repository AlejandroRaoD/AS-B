import { instrumentAttributes } from "../models/instrument.model";

export interface CreateInstrumentDto
	extends Omit<instrumentAttributes, "_id" | "status"> {}
