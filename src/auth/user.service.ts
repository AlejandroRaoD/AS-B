// ****************************************************************************
// 										             creacion
// ****************************************************************************

import { ErrorsMessages } from "../config/messages";
import { employeeAttributes } from "../employee/models/employee.model";
import userModel, { UserAttributes, User_from_DB } from "./models/user.model";

export const createUser_service = async (
	data: UserAttributes
): Promise<User_from_DB> => {
	try {
		const user = new userModel(data);

		await user.save();

		return user;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.user.notCreated);
	}
};

// ****************************************************************************
// 										             getters
// ****************************************************************************

export const get_User_service = async (_id: string): Promise<User_from_DB> => {
	const user = await userModel.findById(_id);

	if (!user) throw new Error(ErrorsMessages.user.notFound);

	return user;
};

export const get_User_by_email_service = async (
	email: string
): Promise<User_from_DB> => {
	try {
		const user = await userModel.findOne({ email });

		if (!user) throw new Error(ErrorsMessages.user.notFound);

		return user;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.user.notFound);
	}
};

export const get_profile_User_service = async (
	_id: string
): Promise<employeeAttributes> => {
	try {
		const user = await userModel
			.findById(_id, { employeeId: 1 })
			.populate("employeeId");

		if (!user) throw new Error(ErrorsMessages.user.notFound);

		const { employeeId: profile } = user;

		return profile as unknown as employeeAttributes;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.user.whenObtaining);
	}
};
