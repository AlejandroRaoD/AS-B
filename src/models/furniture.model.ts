import mongoose from "mongoose";

export enum FurnitureStatus {
	active = "a",
}

export interface furnitureAttributes {
	_id: string;
	name: string;
	description: string;
	serialNumber: string;
	brand: string;
	model: string;
	status: FurnitureStatus;
	observation: string;
	localLocation: string;
	sedeId: String;
}

export interface furniture_from_DB
	extends Omit<furnitureAttributes, "_id">,
		Document {}

const FurnitureSchema = new mongoose.Schema({
	name: { type: String, trim: true, require: true },
	description: { type: String, trim: true, default: "" },

	serialNumber: { type: String, trim: true, default: "" },
	brand: { type: String, trim: true, default: "" },
	model: { type: String, trim: true, default: "" },
	status: {
		type: FurnitureStatus,
		enum: FurnitureStatus,
		default: FurnitureStatus.active,
	},
	observation: { type: String, trim: true, default: "" },

	localLocation: { type: String, trim: true, default: "" },

	sedeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Sede",
		require: true,
	},
});

export default mongoose.model<furniture_from_DB>("Furniture", FurnitureSchema);
