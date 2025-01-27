import { config } from "dotenv";
import { UserLoggedAttributes, UserPermissions } from "../auth/models/user.model";

config();

export const PORT = process.env.PORT || 5000;

export const NODE_ENV = process.env.NODE_ENV || "dev";

export const SECRET_WORD = process.env.SECRET_WORD || "";

export const MONGODB_URI =
	process.env.MONGODB_URI ||
	process.env.MONGODB_URI_TEST ||
	"mongodb://127.0.0.1/test";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const adminUserObject: UserLoggedAttributes = {
	_id: "0",
	email: ADMIN_EMAIL,
	permissions: Object.values(UserPermissions),
	employeeId: null,
};
