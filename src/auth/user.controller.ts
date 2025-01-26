import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { SECRET_WORD } from "../config";
import {
	get_User_by_email_service,
	get_profile_User_service,
} from "./user.service";
import { ErrorMsg } from "../config/messages";

export const signin_user_controller = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await get_User_by_email_service(email);

		const matchPassword = await user.comparePassword(password);

		if (!matchPassword) {
			res.status(401).json({
				token: null,
				message: ErrorMsg.user.errorCredentials,
				error: true,
			});

			return;
		}
		const { _id } = user;

		const token = jwt.sign({ _id }, SECRET_WORD, {
			expiresIn: 86400, // 24 hours
		});

		res.status(200).json({ token });
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.json({ error: true, message: ErrorMsg.user.errorCredentials });
	}
};

export const profile_controller = async (req: Request, res: Response) => {
	const { user } = req;

	if (!user) {
		res
			.status(300)
			.json({ error: true, message: ErrorMsg.user.errorCredentials });
		return;
	}
	const { _id } = user;

	try {
		const user = await get_profile_User_service(_id);

		res.status(200).json({ data: user });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error, message: ErrorMsg.user.whenObtainingProfile });
	}
};
