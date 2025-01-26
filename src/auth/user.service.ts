import jwt from "jsonwebtoken";

import {
	BadRequestException,
	NotFoundException,
} from "../common/classes/ErrorWithHttpStatus";
import {
	ADMIN_EMAIL,
	ADMIN_PASSWORD,
	SECRET_WORD,
	adminUserObject,
} from "../config";
import { ErrorMsg } from "../config/messages";
import { LoginDto } from "./dto/login.dto";
import userModel, {
	UserAttributes,
	UserLoggedAttributes,
	User_from_DB,
} from "./models/user.model";
import { SesionToken_from_DB } from "./models/sesionToken.model";
import sesionTokenModel from "./models/sesionToken.model";

// ****************************************************************************
// 										             creacion
// ****************************************************************************

export const createUser_service = async (
	data: UserAttributes
): Promise<User_from_DB> => {
	try {
		const user = new userModel(data);

		await user.save();

		return user;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.user.notCreated);
	}
};

// ****************************************************************************
// 										             getters
// ****************************************************************************

export const get_User_service = async (_id: string): Promise<User_from_DB> => {
	const user = await userModel.findById(_id);

	if (!user) throw new Error(ErrorMsg.user.notFound);

	return user;
};

export const get_User_by_email_service = async (
	email: string
): Promise<User_from_DB | UserLoggedAttributes> => {
	try {
		const user =
			email == ADMIN_EMAIL
				? adminUserObject
				: await userModel.findOne({ email });

		if (!user) throw new Error(ErrorMsg.user.notFound);

		return user;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.user.notFound);
	}
};

export const get_profile_User_service = async (
	id: string
): Promise<UserLoggedAttributes> => {
	try {
		let adminUser = id == "0" ? adminUserObject : null;
		let dbUser = null;

		if (!adminUser) {
			dbUser = (await userModel.findById(id).populate("employeeId")).toJSON();

			delete dbUser.password;
		}

		const user = adminUser || dbUser;

		if (!user) throw new Error(ErrorMsg.user.notFound);

		return user as unknown as UserLoggedAttributes;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.user.whenObtaining);
	}
};

export const verifyCredentials_service = async (loginDto: LoginDto) => {
	const { email, password } = loginDto;

	const user = await get_User_by_email_service(email);

	if (!user) throw new NotFoundException(ErrorMsg.user.errorCredentials);

	if (user.email != ADMIN_EMAIL) {
		const matchPassword = await (user as User_from_DB).comparePassword(
			password
		);

		if (!matchPassword)
			throw new BadRequestException(ErrorMsg.user.errorCredentials);
	} else if (password != ADMIN_PASSWORD)
		throw new BadRequestException(ErrorMsg.user.errorCredentials);

	const token = jwt.sign({ _id: user._id }, SECRET_WORD, {
		expiresIn: 86400, // 24 hours
	});

	await new sesionTokenModel({ token }).save();

	return token;
};

export const findToken_service = async (
	token: string
): Promise<SesionToken_from_DB> => {
	const sesionToken = await sesionTokenModel.findOne({ token });

	if (!sesionToken)
		throw new BadRequestException(ErrorMsg.user.errorCredentials);

	return sesionToken;
};
