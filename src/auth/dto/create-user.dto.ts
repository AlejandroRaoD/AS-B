import { UserAttributes } from "../models/user.model";

export interface CreateUserDto extends Omit<UserAttributes, "_id"> {}
