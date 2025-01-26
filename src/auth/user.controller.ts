import { Request, Response } from "express";

import {
	get_profile_User_service,
	verifyCredentials_service,
} from "./user.service";
import { ErrorMsg } from "../config/messages";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { BadRequestException } from "../common/classes/ErrorWithHttpStatus";

export const signin_user_controller = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const token = await verifyCredentials_service({ email, password });

		res.status(200).json({ token });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const profile_controller = async (req: Request, res: Response) => {
	try {
		const { user: sesionUser } = req;

		if (!sesionUser)
			throw new BadRequestException(ErrorMsg.user.errorCredentials);

		const user = await get_profile_User_service(sesionUser._id);

		res.status(200).json({ data: user });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
