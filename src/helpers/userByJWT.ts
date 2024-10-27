import jwt from "jsonwebtoken";
import { SECRET_WORD } from "../config";
import { UserAttributes } from "../models/user.model";

const userByJWT = (token: string) => {
	const decoded = jwt.verify(token, SECRET_WORD);

	return decoded as Pick<UserAttributes, "_id">;
};

export default userByJWT;
