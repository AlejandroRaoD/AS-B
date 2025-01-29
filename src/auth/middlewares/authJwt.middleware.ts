import { NextFunction, Request, Response } from "express";
import userByJWT from "../helpers/userByJWT";
import { findToken_service, get_User_service } from "../user.service";
import { errorHandlerHelper } from "../../common/helpers/errorHandler.helper";
import { BadRequestException } from "../../common/classes/ErrorWithHttpStatus";
import { ErrorMsg } from "../../config/messages";
import { UserPermissions } from "../models/user.model";

// import User from "../models/User.js";
// import Role from "../models/Role.js";

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let tokenArr = req.headers["x-access-token"];

	const token = tokenArr instanceof Array ? tokenArr[0] : tokenArr;

	if (!token) {
		res.status(403).json({ message: "No token provided" });
		return;
	}

	try {
		const sesionToken = await findToken_service(token);

		if (!sesionToken)
			throw new BadRequestException(ErrorMsg.user.errorCredentials);

		const { _id } = userByJWT(sesionToken.token);

		req.user = await get_User_service(_id);

		return next();
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

// export const isStudent = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	try {
// 		const { user } = req;

// 		if (!user)
// 			return res.status(300).json({ error: true, message: "not user" });

// 		const { _id, role } = user;

// 		if (role != UserRoles.student)
// 			return res.status(300).json({ error: true, message: "Not student" });

// 		const userFound = await get_StundetUser_service(_id);

// 		if (!userFound)
// 			return res.status(300).json({ error: true, message: "not user in DB" });

// 		return next();
// 	} catch (error) {
// 		return res.status(500).send({ error: true, message: error });
// 	}
// };

export const isAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { user } = req;

		if (!user)
			return res.status(300).json({ error: true, message: "not user" });

		const { _id } = user;

		// if (role != UserRoles.admin)
		// 	return res.status(300).json({ error: true, message: "Not admin" });

		const userFound = await get_User_service(_id);

		if (!userFound)
			return res.status(300).json({ error: true, message: "not user in DB" });

		return next();
	} catch (error) {
		return res.status(500).send({ error: true, message: error });
	}
};

// permiso requerido

export const hasAdminPermission =
	(permission: UserPermissions) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { user } = req;

			if (!user)
				return res.status(300).json({ error: true, message: "not user" });

			const { _id } = user;

			// if (role != UserRoles.admin)
			// 	return res.status(300).json({ error: true, message: "Not admin" });

			const userFound = await get_User_service(_id);

			if (!userFound)
				return res.status(300).json({ error: true, message: "not user in DB" });

			if (!userFound.permissions.includes(permission))
				return res
					.status(300)
					.json({ error: true, message: "not have required permission" });

			return next();
		} catch (error) {
			return res.status(500).send({ error: true, message: error });
		}
	};
