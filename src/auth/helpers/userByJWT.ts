import jwt from "jsonwebtoken";
import { UserAttributes } from "../models/user.model";
import { SECRET_WORD } from "../../config";

const userByJWT = (token: string) => {
	const decoded = jwt.verify(token, SECRET_WORD);

	return decoded as Pick<UserAttributes, "_id">;
};

export default userByJWT;
