import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";

import validateResult from "../../common/helpers/validateHelper";

export const StudentEnrollmentValidator = [
	body("studentId").exists().isString().isMongoId(),
	body("enrollmentPeriodId").exists().isString().isMongoId(),
	body("sedeId").exists().isString().isMongoId(),
	body("content.*.catedraId").exists().isString().isMongoId(),
	body("content.*.comodatoId").optional().isString().isMongoId(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];


export const UpdateStudentEnrollmentValidator = [
	body("content.*.catedraId").exists().isString().isMongoId(),
	body("content.*.comodatoId").optional().isString().isMongoId(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];


export const QueryStudentEnrollmentValidator = [
	query("limit").optional().isInt().toInt().default(10),
	query("skip").optional().isInt().toInt().default(0),
	query("studentId").optional().isString().isMongoId(),
	query("enrollmentPeriodId").optional().isString().isMongoId(),
	query("sedeId").optional().isString().isMongoId(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
