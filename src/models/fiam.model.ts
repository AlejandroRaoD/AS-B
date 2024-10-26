import mongoose from "mongoose";

export enum FiamTypes {
	A = "A",
}

export interface fiamAttributes {
	_id: string;
	catedraId: string;
	employeeId: string;
	type: FiamTypes;
}

export interface fiam_from_DB extends Omit<fiamAttributes, "_id">, Document {}

const FiamSchema = new mongoose.Schema({
	catedraId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Catedra",
		require: true,
	},

	employeeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
		require: true,
	},

	type: { type: FiamTypes, enum: FiamTypes, require: true },
});

export default mongoose.model<fiam_from_DB>("Fiam", FiamSchema);
