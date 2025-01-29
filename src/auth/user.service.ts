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
import { ErrorMsg, moduleItems } from "../config/messages";
import { LoginDto } from "./dto/login.dto";
import userModel, {
	UserLoggedAttributes,
	User_from_DB,
} from "./models/user.model";
import { SesionToken_from_DB } from "./models/sesionToken.model";
import sesionTokenModel from "./models/sesionToken.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

// ****************************************************************************
// 										             creacion
// ****************************************************************************

export const createUser_service = async (data: CreateUserDto) => {
	const { email } = data;

	let oldUser = null;
	try {
		oldUser = await get_User_by_email_service(email);
	} catch (error) {}

	if (oldUser)
		throw new BadRequestException(ErrorMsg.alreadyExist(moduleItems.user));

	const user = new userModel(data);

	await user.save();

	user.password = "";

	return user;
};

// ****************************************************************************
// 										             getters
// ****************************************************************************

export const get_Users_service = async (): Promise<User_from_DB[]> => {
	const user = await userModel.find(null, { password: 0 }).sort("email");

	return user;
};

export const get_User_service = async (
	id: string
): Promise<User_from_DB | UserLoggedAttributes> => {
	const user =
		id == adminUserObject._id
			? adminUserObject
			: await userModel.findById(id, { password: 0 });

	if (!user) throw new Error(ErrorMsg.user.notFound);

	return user;
};

export const get_User_by_email_service = async (
	email: string
): Promise<User_from_DB | UserLoggedAttributes> => {
	const user =
		email == ADMIN_EMAIL ? adminUserObject : await userModel.findOne({ email });

	if (!user) throw new NotFoundException(ErrorMsg.notFound(moduleItems.user));

	return user;
};

export const get_profile_User_service = async (
	id: string
): Promise<UserLoggedAttributes> => {
	let adminUser = id == adminUserObject._id ? adminUserObject : null;
	let dbUser = null;

	if (!adminUser) {
		dbUser = (await userModel.findById(id).populate("employeeId")).toJSON();

		delete dbUser.password;
	}

	const user = adminUser || dbUser;

	if (!user) throw new NotFoundException(ErrorMsg.notFound(moduleItems.user));

	return user as unknown as UserLoggedAttributes;
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

// ****************************************************************************
// 										             update
// ****************************************************************************

export const updateUser_service = async (
	id: string,
	data: UpdateUserDto
): Promise<User_from_DB> => {
	const { email } = data;

	const oldUser = await get_User_by_email_service(email);

	if (oldUser._id != id)
		throw new BadRequestException(ErrorMsg.alreadyExist(moduleItems.user));

	const user = await userModel.findByIdAndUpdate(id, data, { new: true });

	return user;
};

export const deleteUser_service = async (id: string) => {
	return await userModel.findByIdAndDelete(id);
};
