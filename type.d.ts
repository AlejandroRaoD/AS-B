
import { Request } from "express";
import { UserAttributes } from "./src/models/user.model";

declare module "express" {
	interface Request {
		user?: Pick<UserAttributes, "_id">;
	}
}
