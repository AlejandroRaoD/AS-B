import { NextFunction, Request, Response } from "express";
import { query } from "express-validator";

import validateResult from "../../common/helpers/validateHelper";

export const QuerySystemLogValidator = [
	query("limit").optional().isInt().toInt().default(10),
	query("skip").optional().isInt().toInt().default(0),
	query("userId").optional().isString().isMongoId(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
