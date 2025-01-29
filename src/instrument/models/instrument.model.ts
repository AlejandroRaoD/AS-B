import mongoose from "mongoose";

export enum InstrumentStatus {
	active = "a",
}

export interface instrumentAttributes {
	_id: string;
	name: string;
	description: string;
	serialNumber: string;
	brand: string;
	model: string;
	status: InstrumentStatus;
	observation: string;
	sedeId: String;
}

export interface instrument_from_DB
	extends Omit<instrumentAttributes, "_id">,
		Document {
	_id: mongoose.Schema.Types.ObjectId;
}

const InstrumentSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, require: true },
		description: { type: String, trim: true, default: "" },

		serialNumber: { type: String, trim: true, default: "" },
		brand: { type: String, trim: true, default: "" },
		model: { type: String, trim: true, default: "" },
		status: {
			type: String,
			enum: InstrumentStatus,
			default: InstrumentStatus.active,
		},
		observation: { type: String, trim: true, default: "" },

		sedeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Sede",
			require: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<instrument_from_DB>(
	"Instrument",
	InstrumentSchema
);
