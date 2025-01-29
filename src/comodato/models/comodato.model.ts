import mongoose from "mongoose";

export enum ComodatoStatus {
	active = "a",
	delete = "d",
}

export interface ComodatoAttributes {
	_id: string;
	instrumentId: string;
	studentId: string;
	status: ComodatoStatus;
	initDate: Date;
	endDate: Date;
	contractNumber: number;
}

export interface comodato_from_DB
	extends Omit<ComodatoAttributes, "_id">,
		Document {
	_id: mongoose.Schema.Types.ObjectId;
}

const ComodatoSchema = new mongoose.Schema(
	{
		instrumentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Instrument",
			require: true,
		},

		studentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
			require: true,
		},

		status: { type: String, default: ComodatoStatus.active },
		initDate: { type: Date, default: new Date() },
		endDate: { type: Date },

		// todo: automatizar
		contractNumber: { type: Number, require: true, unique: true },
	},
	{ timestamps: true }
);

export default mongoose.model<comodato_from_DB>("Comodato", ComodatoSchema);
