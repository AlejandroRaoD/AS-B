// ****************************************************************************
// 										             creacion
// ****************************************************************************

import { ErrorMsg } from "../config/messages";
import userModel, {
	UserAttributes,
	UserLoggedAttributes,
	User_from_DB,
} from "./models/user.model";

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
): Promise<User_from_DB> => {
	try {
		const user = await userModel.findOne({ email });

		if (!user) throw new Error(ErrorMsg.user.notFound);

		return user;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.user.notFound);
	}
};

export const get_profile_User_service = async (
	_id: string
): Promise<UserLoggedAttributes> => {
	try {
		const user = await userModel
			.findById(_id)
			.populate("employeeId");


			console.log(user);
			

		if (!user) throw new Error(ErrorMsg.user.notFound);

		return user as unknown as UserLoggedAttributes;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.user.whenObtaining);
	}
};
