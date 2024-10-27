
import { Request } from "express";

declare module "express" {
	interface Request {
		user?: Pick<userAttributes, "_id">;
	}
}
