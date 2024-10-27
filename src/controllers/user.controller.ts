import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

import { SECRET_WORD } from "../config";
import {
	get_User_by_email_service,
	get_profile_User_service,
} from "../services/user.service";
import { ErrorsMessages } from "../config/messages";

// export const signin_Student_controller = async (
// 	req: Request,
// 	res: Response
// ) => {
// 	const { email, password } = req.body;

// 	try {
// 		const user = await getStundetUser_by_email_service(email);

// 		if (!user)
// 			return res.status(400).json({ error: true, message: "User Not Found" });

// 		const matchPassword = await user.comparePassword(password);

// 		if (!matchPassword)
// 			return res.status(401).json({
// 				token: null,
// 				message: "Invalid Password",
// 				error: true,
// 			});

// 		const { _id, role } = user;

// 		const token = jwt.sign({ _id, role }, SECRET_WORD, {
// 			expiresIn: 86400, // 24 hours
// 		});

// 		return res.status(200).json({ token });
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(500).json({ error, message: "Error in server" });
// 	}
// };

export const signin_user_controller = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await get_User_by_email_service(email);

		const matchPassword = await user.comparePassword(password);

		if (!matchPassword)
			return res.status(401).json({
				token: null,
				message: "Invalid Password",
				error: true,
			});

		const { _id } = user;

		const token = jwt.sign({ _id }, SECRET_WORD, {
			expiresIn: 86400, // 24 hours
		});

		return res.status(200).json({ token });
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ error: true, message: ErrorsMessages.user.notFound });
	}
};

export const profile_controller = async (req: Request, res: Response) => {
	const { user } = req;

	if (!user)
		return res
			.status(300)
			.json({ error: true, message: ErrorsMessages.user.notToken });

	const { _id } = user;

	try {
		const user = await get_profile_User_service(_id);

		return res.status(200).json({ profile: user });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error, message: ErrorsMessages.user.whenObtainingProfile });
	}
};
