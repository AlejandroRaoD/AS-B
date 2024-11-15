import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";
import validateResult from "../../../common/helpers/validateHelper";

export const SedeValidator = [
	body("name").exists().isString().trim().notEmpty(),
	body("address").exists().isString().trim().notEmpty(),
	body("phone_number.*").exists().isString().trim().notEmpty(),
	body("nucleoId").exists().isString().trim().notEmpty(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const UpdateSedeValidator = [
	body("name").optional().isString().trim().notEmpty(),
	body("address").optional().isString().trim().notEmpty(),
	body("phone_number.*").optional().isString().trim().notEmpty(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const QuerySedeValidator = [
	query("name").optional().isString().trim().notEmpty(),
	query("limit").optional().isInt().toInt().default(10),
	query("skip").optional().isInt().toInt().default(0),
	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
