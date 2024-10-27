import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserAttributes {
	_id: string;
	email: string;
	password: string;
	permissions: string[];
	employeeId: string;
}

export interface User_from_DB extends UserAttributes, Document {
	comparePassword(passwordReceived: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
	email: { type: String, trim: true, require: true, unique: true },
	password: { type: String, require: true, default: "" },
	permissions: [{ type: String }],
	employeeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
		require: true,
	},
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

export default mongoose.model<User_from_DB>("User", UserSchema);
