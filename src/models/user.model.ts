import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface userAttributes {
	_id: string;
	email: string;
	password: string;
	permissions: string[];
	// todo: anadir perfil del trabajador
}

export interface user_from_DB extends Omit<userAttributes, "_id">, Document {
	comparePassword(passwordReceived: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
	email: { type: String, trim: true, require: true, unique: true },
	password: { type: String, require: true, default: "" },
	permissions: [{ type: String }],
});

UserSchema.pre("save", async function (next) {
	const user = this;

	if (!user.isModified("password")) next();

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);

	user.password = hash;

	next();
});

UserSchema.methods.comparePassword = async function (passwordReceived: string) {
	return await bcrypt.compare(passwordReceived, this.password);
};

export default mongoose.model<user_from_DB>("User", UserSchema);
