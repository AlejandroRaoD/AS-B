import { studentRepresentativeAttributes } from "../models/studentRepresentative.model";

export interface CreateStudentRepresentativeDto
	extends Omit<studentRepresentativeAttributes, "_id"> {}
