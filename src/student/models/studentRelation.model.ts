import mongoose from "mongoose";

export interface studentRelationAttributes {
	_id: string;
	representativeId: string;
	studentId: string;
	familyBond: string;
}

export interface studentRelation_from_DB
	extends Omit<studentRelationAttributes, "_id">,
		Document {
	_id: mongoose.Schema.Types.ObjectId;
}

const StudentRelationSchema = new mongoose.Schema(
	{
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
	},
	{ timestamps: true }
);

export default mongoose.model<studentRelation_from_DB>(
	"StudentRelation",
	StudentRelationSchema
);
