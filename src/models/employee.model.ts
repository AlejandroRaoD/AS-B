import mongoose from "mongoose";
import { BusinessPosition, Gender } from "../config/enums";

export interface employeeAttributes {
	_id: string;
	name: string;
	lastname: string;
	birthday: Date;
	CI: string;
	email: string;
	gender: Gender;
	address: string;
	phone_number: string[];
	businessPosition: BusinessPosition;
	sedeId: String;
}

export interface employee_from_DB
	extends Omit<employeeAttributes, "_id">,
		Document {}

const EmployeeSchema = new mongoose.Schema({
	name: { type: String, trim: true, require: true },
	lastname: { type: String, trim: true },
	birthday: { type: Date, require: true },
	CI: { type: String, trim: true, require: true, unique: true },
	email: { type: String, trim: true, require: true, unique: true },
	gender: { type: Gender, enum: Gender },
	address: { type: String, trim: true, require: true },
	phone_number: [String],
	businessPosition: { type: BusinessPosition, require: true },
	sedeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Sede",
		require: true,
	},
});

export default mongoose.model<employee_from_DB>("Employee", EmployeeSchema);
