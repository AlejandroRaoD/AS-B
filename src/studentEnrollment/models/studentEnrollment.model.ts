import mongoose from "mongoose";

export interface EnrollmentContent {
	catedraId: string;
	comodatoId: string | null;
}

export interface studentEnrollmentAttributes {
	_id: string;
	studentId: string;
	enrollmentPeriodId: string;
	sedeId: string;
	content: EnrollmentContent[];
	date: Date;
}

export interface studentEnrollment_from_DB
	extends Omit<studentEnrollmentAttributes, "_id">,
		Document {}

const StudentEnrollmentSchema = new mongoose.Schema({
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		require: true,
	},
	enrollmentPeriodId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "EnrollmentPeriod",
		require: true,
	},
	sedeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Sede",
		require: true,
	},

	content: [
		{
			catedraId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Catedra",
				require: true,
			},
			comodatoId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comodato",
				default: null,
			},
		},
	],
});

export default mongoose.model<studentEnrollment_from_DB>(
	"StudentEnrollment",
	StudentEnrollmentSchema
);
