import mongoose, { Document } from "mongoose";
import { Gender } from "../../config/enums";
import { Nationality } from "../../common/interfaces/nationality.enum";

export enum StudentStatus {
	active = "a",
	inArchive = "ar",
	delete = "d",
}

export interface studentAttributes {
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
	hasInstrument: boolean;
	status: StudentStatus;
}

export interface student_from_DB
	extends Omit<studentAttributes, "_id">,
		Document {}

const StudentSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, require: true },
		lastname: { type: String, trim: true },
		birthday: { type: Date, require: true },
		CI: { type: String, trim: true },
		email: { type: String, trim: true },
		gender: { type: String, enum: Gender },
		address: { type: String, trim: true, require: true },
		phone_number: [String],
		hasInstrument: { type: Boolean, default: false },
		status: { type: String, trim: true, default: StudentStatus.active },
		nationality: { type: String, trim: true, default: Nationality.Venezuelan },
	},
	{ timestamps: true }
);

export default mongoose.model<student_from_DB>("Student", StudentSchema);
