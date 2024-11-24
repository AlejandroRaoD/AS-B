import mongoose from "mongoose";

export interface studentRepresentativeAttributes {
	_id: string;
	representativeId: string;
	studentId: string;
	familyBond: String;
}

export interface studentRepresentative_from_DB
	extends Omit<studentRepresentativeAttributes, "_id">,
		Document {}

const StudentRepresentativeSchema = new mongoose.Schema({
	representativeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Representative",
		require: true,
	},

	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		require: true,
	},
	familyBond: { type: String, require: true },
});

export default mongoose.model<studentRepresentative_from_DB>(
	"StudentRepresentative",
	StudentRepresentativeSchema
);
