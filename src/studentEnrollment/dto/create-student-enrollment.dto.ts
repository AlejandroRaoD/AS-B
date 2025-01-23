import { studentEnrollmentAttributes } from "../models/studentEnrollment.model";

export interface CreateStudentEnrollmentDto
	extends Omit<studentEnrollmentAttributes, "_id" | "status"> {}
