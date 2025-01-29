import mongoose, { Document } from "mongoose";

export enum EnrollmentPeriodStatus {
	active = "a",
	inArchive = "ar",
	delete = "d",
}

export interface enrollmentPeriodAttributes {
	_id: string;
	year: Number;
	step: Number;
	status: EnrollmentPeriodStatus;
}

export interface enrollmentPeriod_from_DB
	extends Omit<enrollmentPeriodAttributes, "_id">,
		Document {
	_id: mongoose.Schema.Types.ObjectId;
}

const EnrollmentPeriodSchema = new mongoose.Schema(
	{
		year: { type: Number, require: true, default: new Date().getFullYear() },
		step: { type: Number, require: true, default: 1 },
		status: {
			type: String,
			trim: true,
			default: EnrollmentPeriodStatus.active,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<enrollmentPeriod_from_DB>(
	"EnrollmentPeriod",
	EnrollmentPeriodSchema
);
