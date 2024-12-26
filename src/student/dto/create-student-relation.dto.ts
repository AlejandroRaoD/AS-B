import { studentRelationAttributes } from "../models/studentRelation.model";

export interface CreateStudentRelationDto
	extends Omit<studentRelationAttributes, "_id"> {}
