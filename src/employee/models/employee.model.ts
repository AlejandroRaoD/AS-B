import mongoose, { Document } from "mongoose";
import { BusinessPosition, Gender } from "../../config/enums";
import { Nationality } from "../../common/interfaces/nationality.enum";

export interface employeeAttributes {
	_id: string;
	name: string;
	lastname: string;
	birthday: Date;
	nationality: Nationality;
	CI: string;
	email: string;
	gender: Gender;
	address: string;
	phone_number: string[];
	businessPosition: BusinessPosition;
	sedeId: string;
}

export interface employee_from_DB
	extends Omit<employeeAttributes, "_id">,
		Document {
	_id: mongoose.Schema.Types.ObjectId;
}

const EmployeeSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, require: true },
		lastname: { type: String, trim: true },
		birthday: { type: Date, require: true },
		CI: { type: String, trim: true, require: true, unique: true },
		email: { type: String, trim: true, require: true, unique: true },
		gender: { type: String, enum: Gender },
		address: { type: String, trim: true, require: true },
		phone_number: [String],
		businessPosition: { type: String, enum: BusinessPosition, require: true },
		sedeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Sede",
			require: true,
		},
		nationality: { type: String, trim: true, default: Nationality.Venezuelan },
	},
	{ timestamps: true }
);

export default mongoose.model<employee_from_DB>("Employee", EmployeeSchema);
