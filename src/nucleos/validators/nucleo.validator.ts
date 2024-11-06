import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";

import validateResult from "../../common/helpers/validateHelper";

export const NucleoValidator = [
	body("name").exists().isString().trim().notEmpty(),
	// body(["digitalCost", "simpleCost", "securityCost"])
	// 	.exists()
	// 	.customSanitizer((value) => (value ? (value > 0 ? value : 0) : 0)),

	// body("areas")
	// 	.exists()
	// 	.isArray()
	// 	.custom(async (value: string[]) => {
	// 		let notExist = false;

	// 		await Promise.all(
	// 			value.map(async (areaId) => {
	// 				const a = await UniversityAreaModel.findById(areaId);

	// 				if (!a) notExist = true;
	// 			})
	// 		);

	// 		return notExist;
	// 	})
	// 	.withMessage("No existe area"),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
