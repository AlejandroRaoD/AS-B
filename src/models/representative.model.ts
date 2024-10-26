import mongoose from "mongoose";
import { Gender } from "../config/enums";

export interface representativeAttributes {
	_id: string;
	name: string;
	lastname: string;
	birthday: Date;
	CI: string;
	email: string;
	gender: Gender;
	address: string;
	phone_number: string[];
	job: string;
	familyBond: String;
}

export interface representative_from_DB
	extends Omit<representativeAttributes, "_id">,
		Document {}

const RepresentativeSchema = new mongoose.Schema({
	name: { type: String, trim: true, require: true },
	lastname: { type: String, trim: true },
	birthday: { type: Date, require: true },
	CI: { type: String, trim: true, require: true, unique: true },
	email: { type: String, trim: true, require: true, unique: true },
	gender: { type: Gender, enum: Gender },
	address: { type: String, trim: true, require: true },
	phone_number: [String],
	job: { type: String, require: true },
	familyBond: { type: String, require: true },
});

export default mongoose.model<representative_from_DB>(
	"Representative",
	RepresentativeSchema
);
