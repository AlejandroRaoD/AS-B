import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";

import validateResult from "../../common/helpers/validateHelper";

export const CreateComodatoValidator = [
	body("instrumentId").exists().isString().isMongoId(),
	body("studentId").exists().isString().isMongoId(),
	body("contractNumber").exists().isString().trim(),
	body("initDate").exists().isDate(),
	body("endDate").exists().isDate(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const UpdateComodatoValidator = [
	body("instrumentId").optional().isString().isMongoId(),
	body("studentId").optional().isString().isMongoId(),
	body("contractNumber").optional().isString().trim(),
	body("initDate").optional().isDate(),
	body("endDate").optional().isDate(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const QueryComodatoValidator = [
	query("limit").optional().isInt().toInt().default(10),
	query("skip").optional().isInt().toInt().default(0),

	query("instrumentId").optional().isString().isMongoId(),
	query("studentId").optional().isString().isMongoId(),
	query("contractNumber").optional().isString().trim(),
	query("initDate").optional().isDate(),
	query("endDate").optional().isDate(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
