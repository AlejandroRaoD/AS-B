import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";

import validateResult from "../../common/helpers/validateHelper";

export const StudentRelationValidator = [
	body("representativeId").exists().isString().trim().notEmpty().isMongoId(),
	body("studentId").exists().isString().trim().notEmpty().isMongoId(),
	body("familyBond").exists().isString().trim().notEmpty(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const UpdateStudentRelationValidator = [
	body("representativeId").optional().isString().trim().notEmpty().isMongoId(),
	body("studentId").optional().isString().trim().notEmpty().isMongoId(),
	body("familyBond").optional().isString().trim().notEmpty(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const QueryStudentRelationValidator = [
	query("representativeId").optional().isString().trim().notEmpty().isMongoId(),
	query("studentId").optional().isString().trim().notEmpty().isMongoId(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
