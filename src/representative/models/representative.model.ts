import mongoose from "mongoose";
import { Gender } from "../../config/enums";
import { Nationality } from "../../common/interfaces/nationality.enum";

export interface representativeAttributes {
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
	job: string;
}

export interface representative_from_DB
	extends Omit<representativeAttributes, "_id">,
		Document {
	_id: mongoose.Schema.Types.ObjectId;
}

const RepresentativeSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, require: true },
		lastname: { type: String, trim: true },
		birthday: { type: Date, require: true },
		nationality: { type: String, trim: true, default: Nationality.Venezuelan },
		CI: { type: String, trim: true, require: true, unique: true },
		email: { type: String, trim: true, require: true, unique: true },
		gender: { type: String, enum: Gender },
		address: { type: String, trim: true, require: true },
		phone_number: [String],
		job: { type: String, require: true },
	},
	{ timestamps: true }
);

export default mongoose.model<representative_from_DB>(
	"Representative",
	RepresentativeSchema
);
