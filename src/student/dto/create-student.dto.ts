import { studentAttributes } from "../models/student.model";

export interface CreateStudentDto
	extends Omit<studentAttributes, "_id" | "status"> {}
