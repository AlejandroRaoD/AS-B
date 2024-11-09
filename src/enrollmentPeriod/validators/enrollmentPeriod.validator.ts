import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";

import validateResult from "../../common/helpers/validateHelper";

export const CreateEnrollmentPeriodValidator = [
	body("year").exists().isInt({ min: 0 }).toInt(),
	body("step").exists().isInt({ min: 1 }).toInt(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const UpdateEnrollmentPeriodValidator = [
	body("year").exists().isInt({ min: 0 }).toInt(),
	body("step").exists().isInt({ min: 1 }).toInt(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const QueryEnrollmentPeriodValidator = [
	query("year").optional().isString().trim().notEmpty(),
	query("step").optional().exists().isString().trim().notEmpty(),
	query("limit").optional().isInt().toInt().default(10),
	query("skip").optional().isInt().toInt().default(0),
	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
