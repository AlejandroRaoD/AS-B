import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";

import validateResult from "../../common/helpers/validateHelper";
import { Gender } from "../../config/enums";
import { Nationality } from "../../common/interfaces/nationality.enum";

export const CreateEmployeeValidator = [
	body("name").exists().isString().trim().notEmpty(),
	body("lastname").exists().isString().trim(),
	body("birthday").exists().isString().trim(),

	body("nationality")
		.optional()
		.isString()
		.trim()
		.isIn(Object.values(Nationality)),

	body("CI")
		.optional()
		.customSanitizer((value) => value.toString().replace(/\D/g, "")),

	body("email").optional().isString().trim().isEmail(),
	body("gender").exists().isString().trim().isIn(Object.values(Gender)),
	body("address").exists().isString().trim(),
	body("phone_number.*")
		.optional()
		.isString()
		.trim()
		.customSanitizer((value) => value.match(/^\+|\d/g).join("")),

	body("businessPosition").exists().isString().trim(),

	body("sedeId").exists().isString().isMongoId(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const UpdateEmployeeValidator = [
	body("name").optional().isString().trim().notEmpty(),
	body("lastname").optional().isString().trim(),
	body("birthday").optional().isString().trim(),

	body("nationality")
		.optional()
		.isString()
		.trim()
		.isIn(Object.values(Nationality)),

	body("CI")
		.optional()
		.customSanitizer((value) => value.toString().replace(/\D/g, "")),

	body("email").optional().isString().trim().isEmail(),
	body("gender").optional().isString().trim().isIn(Object.values(Gender)),
	body("address").optional().isString().trim(),
	body("phone_number.*")
		.optional()
		.isString()
		.trim()
		.customSanitizer((value) => value.match(/^\+|\d/g).join("")),

	body("businessPosition").optional().isString().trim(),

	body("sedeId").optional().isString().isMongoId(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const QueryEmployeeValidator = [
	query("limit").optional().isInt().toInt().default(10),
	query("skip").optional().isInt().toInt().default(0),

	query("name").optional().isString().trim().notEmpty(),
	query("lastname").optional().isString().trim(),
	// body("birthday").optional().isString().trim().isDate(),
	query("nationality")
		.optional()
		.isString()
		.trim()
		.isIn(Object.values(Nationality)),
	query("CI")
		.optional()
		.isString()
		.trim()
		.customSanitizer((value) => value.replace(/\D/g, "")),
	query("email").optional().isString().trim().isEmail(),
	query("gender").optional().isString().trim().isIn(Object.values(Gender)),
	// body("address").optional().isString().trim(),
	query("phone_number")
		.optional()
		.isString()
		.trim()
		.customSanitizer((value) => value.match(/^\+|\d/g).join("")),

	query("sedeId").optional().isString().isMongoId(),

	query("businessPosition").optional().isString().trim(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
