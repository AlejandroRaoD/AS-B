import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";

import validateResult from "../../common/helpers/validateHelper";

export const NucleoValidator = [
	body("name").exists().isString().trim().notEmpty(),
	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const QueryNucleoValidator = [
	query("name").optional().isString().trim().notEmpty(),
	query("limit").optional().isInt().toInt().default(10),
	query("skip").optional().isInt().toInt().default(0),
	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
