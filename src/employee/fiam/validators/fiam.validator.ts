import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";

import validateResult from "../../../common/helpers/validateHelper";
import { FiamTypes } from "../models/fiam.model";

export const FiamValidator = [
	body("catedraId").exists().isString().isMongoId(),
	body("employeeId").exists().isString().isMongoId(),
	body("type").exists().isString().trim().isIn(Object.values(FiamTypes)),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const QueryFiamValidator = [
	query("limit").optional().isInt().toInt().default(10),
	query("skip").optional().isInt().toInt().default(0),

	query("catedraId").optional().isString().isMongoId(),
	query("employeeId").optional().isString().isMongoId(),
	query("type").optional().isString().trim().isIn(Object.values(FiamTypes)),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
