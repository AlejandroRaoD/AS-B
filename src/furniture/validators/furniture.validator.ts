import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";

import validateResult from "../../common/helpers/validateHelper";

export const FurnitureValidator = [
	body("name").exists().isString().trim().notEmpty(),
	body("quantity").exists().isInt(),
	body("description").exists().isString().trim(),
	body("serialNumber").exists().isString().trim(),
	body("brand").exists().isString().trim(),
	body("model").exists().isString().trim(),
	body("observation").exists().isString().trim(),
	body("localLocation").exists().isString().trim(),
	body("sedeId").exists().isString().isMongoId(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const QueryFurnitureValidator = [
	query("limit").optional().isInt().toInt().default(10),
	query("skip").optional().isInt().toInt().default(0),

	query("name").optional().isString().trim().notEmpty(),
	query("quantity").optional().isInt(),
	query("description").optional().isString().trim(),
	query("serialNumber").optional().isString().trim(),
	query("brand").optional().isString().trim(),
	query("model").optional().isString().trim(),
	query("observation").optional().isString().trim(),
	query("localLocation").optional().isString().trim(),
	query("sedeId").optional().isString().isMongoId(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
