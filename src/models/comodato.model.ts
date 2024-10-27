import mongoose from "mongoose";

export enum ComodatoStatus {
	active = "a",
}

export interface ComodatoAttributes {
	_id: string;
	instrumentId: string;
	status: ComodatoStatus;
	initDate: Date;
	endDate: Date;
	contractNumber: number;
}

export interface comodato_from_DB
	extends Omit<ComodatoAttributes, "_id">,
		Document {}

const ComodatoSchema = new mongoose.Schema({
	instrumentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Instrument",
		require: true,
	},
	status: { type: ComodatoStatus, default: ComodatoStatus.active },
	initDate: { type: Date, default: new Date() },
	endDate: { type: Date },
	contractNumber: { type: Number, require: true, unique: true },
});

export default mongoose.model<comodato_from_DB>("Comodato", ComodatoSchema);
