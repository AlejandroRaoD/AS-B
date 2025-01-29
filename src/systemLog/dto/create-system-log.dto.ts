import { systemLogAttributes } from "../models/systemLog.model";

export interface CreateSystemLogDto
	extends Omit<systemLogAttributes, "_id" | "createdAt" | "updatedAt"> {}
