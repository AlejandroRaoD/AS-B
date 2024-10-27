import mongoose from "mongoose";

export interface enrollmentPeriodAttributes {
	_id: string;
	year: Number;
	step: Number;
}

export interface enrollmentPeriod_from_DB
	extends Omit<enrollmentPeriodAttributes, "_id">,
		Document {}

const EnrollmentPeriodSchema = new mongoose.Schema({
	year: { type: Number, require: true, default: new Date().getFullYear() },
	step: { type: Number, require: true, default: 1 },
});

export default mongoose.model<enrollmentPeriod_from_DB>(
	"EnrollmentPeriod",
	EnrollmentPeriodSchema
);
