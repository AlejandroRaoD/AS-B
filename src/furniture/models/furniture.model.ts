import mongoose from "mongoose";

export enum FurnitureStatus {
	active = "a",
}

export interface furnitureAttributes {
	_id: string;
	name: string;
	quantity: number;
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
		Document {	_id: mongoose.Schema.Types.ObjectId;
		}

const FurnitureSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, require: true },
		description: { type: String, trim: true, default: "" },
		quantity: { type: Number, default: 1 },
		serialNumber: { type: String, trim: true, default: "" },
		brand: { type: String, trim: true, default: "" },
		model: { type: String, trim: true, default: "" },
		status: {
			type: String,
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
	},
	{ timestamps: true }
);

export default mongoose.model<furniture_from_DB>("Furniture", FurnitureSchema);
