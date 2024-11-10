import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";

import validateResult from "../../common/helpers/validateHelper";
import { Nationality } from "../../common/interfaces/nationality.enum";
import { Gender } from "../../config/enums";

export const CreateStudentValidator = [
	body("name").exists().isString().trim().notEmpty(),
	body("lastname").exists().isString().trim(),
	body("birthday").exists().isString().trim().isDate(),
	body("nationality")
		.optional()
		.isString()
		.trim()
		.isIn(Object.values(Nationality)),
	body("CI")
		.optional()
		.isString()
		.trim()
		.customSanitizer((value) => value.replace(/\D/g, "")),
	body("email").optional().isString().trim().isEmail(),
	body("gender").exists().isString().trim().isIn(Object.values(Gender)),
	body("address").exists().isString().trim(),
	body("phone_number")
		.optional()
		.isString()
		.trim()
		.customSanitizer((value) => value.match(/^\+|\d/g).join("")),

	body("hasInstrument").optional().isBoolean(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const UpdateStudentValidator = [
	body("name").optional().isString().trim().notEmpty(),
	body("lastname").optional().isString().trim(),
	body("birthday").optional().isString().trim().isDate(),
	body("nationality")
		.optional()
		.isString()
		.trim()
		.isIn(Object.values(Nationality)),
	body("CI")
		.optional()
		.isString()
		.trim()
		.customSanitizer((value) => value.replace(/\D/g, "")),
	body("email").optional().isString().trim().isEmail(),
	body("gender").optional().isString().trim().isIn(Object.values(Gender)),
	body("address").optional().isString().trim(),
	body("phone_number")
		.optional()
		.isString()
		.trim()
		.customSanitizer((value) => value.match(/^\+|\d/g).join("")),
	body("hasInstrument").optional().isBoolean(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export const QueryStudentValidator = [
	query("limit").optional().isInt().toInt().default(10),
	query("skip").optional().isInt().toInt().default(0),

	body("name").optional().isString().trim().notEmpty(),
	body("lastname").optional().isString().trim(),
	// body("birthday").optional().isString().trim().isDate(),
	body("nationality")
		.optional()
		.isString()
		.trim()
		.isIn(Object.values(Nationality)),
	body("CI")
		.optional()
		.isString()
		.trim()
		.customSanitizer((value) => value.replace(/\D/g, "")),
	body("email").optional().isString().trim().isEmail(),
	body("gender").optional().isString().trim().isIn(Object.values(Gender)),
	// body("address").optional().isString().trim(),
	body("phone_number")
		.optional()
		.isString()
		.trim()
		.customSanitizer((value) => value.match(/^\+|\d/g).join("")),
	body("hasInstrument").optional().isBoolean(),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
