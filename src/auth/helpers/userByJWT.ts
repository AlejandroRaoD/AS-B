import jwt from "jsonwebtoken";
import { UserAttributes } from "../models/user.model";
import { SECRET_WORD } from "../../config";
import { BadRequestException } from "../../common/classes/ErrorWithHttpStatus";
import { ErrorMsg } from "../../config/messages";

const userByJWT = (token: string) => {
	try {
		const decoded = jwt.verify(token, SECRET_WORD);

		return decoded as Pick<UserAttributes, "_id">;
	} catch (error) {
		throw new BadRequestException(ErrorMsg.user.errorCredentials);
	}
};

export default userByJWT;
