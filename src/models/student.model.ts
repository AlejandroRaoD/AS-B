import mongoose from "mongoose";
import { Gender } from "../config/enums";

export interface studentAttributes {
	_id: string;
	name: string;
	lastname: string;
	birthday: Date;
	CI: string;
	email: string;
	gender: Gender;
	address: string;
	phone_number: string[];
	hasInstrument: boolean;
}

export interface student_from_DB
	extends Omit<studentAttributes, "_id">,
		Document {}

const StudentSchema = new mongoose.Schema({
	name: { type: String, trim: true, require: true },
	lastname: { type: String, trim: true },
	birthday: { type: Date, require: true },
	CI: { type: String, trim: true },
	email: { type: String, trim: true, require: true, unique: true },
	gender: { type: Gender, enum: Gender },
	address: { type: String, trim: true, require: true },
	phone_number: [String],
	hasInstrument: { type: Boolean, default: false },
});

export default mongoose.model<student_from_DB>("Student", StudentSchema);
