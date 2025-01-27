import { Request, Response } from "express";

import {
	createUser_service,
	deleteUser_service,
	get_User_service,
	get_Users_service,
	get_profile_User_service,
	updateUser_service,
	verifyCredentials_service,
} from "./user.service";

import { ErrorMsg } from "../config/messages";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { BadRequestException } from "../common/classes/ErrorWithHttpStatus";
import { matchedData } from "express-validator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

export const createUser_controller = async (req: Request, res: Response) => {
	try {
		const createUserDto = matchedData(req) as CreateUserDto;

		const user = await createUser_service(createUserDto);

		res.status(200).json({ data: user });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getUser_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const user = await get_User_service(id);

		res.status(200).json({ data: user });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getUsers_controller = async (_req: Request, res: Response) => {
	try {
		const user = await get_Users_service();

		res.status(200).json({ data: user });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

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

export const updateUser_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updateUserDto = matchedData(req) as UpdateUserDto;

		const user = await updateUser_service(id, updateUserDto);

		res.status(200).json({ data: user });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteUser_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		await deleteUser_service(id);

		res.status(200).json({ data: "ok" });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
