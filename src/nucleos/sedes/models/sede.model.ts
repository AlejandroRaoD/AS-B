import mongoose from "mongoose";

export interface sedeAttributes {
	_id: string;
	name: string;
	address: String;
	phone_number: String[];
	nucleoId: String;
}

export interface sede_from_DB extends Omit<sedeAttributes, "_id">, Document {}

const SedeSchema = new mongoose.Schema({
	name: { type: String, trim: true, require: true },
	address: { type: String, trim: true, required: true },
	phone_number: [{ type: String, trim: true, required: true }],
	nucleoId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Nucleo",
		require: true,
	},
});

export default mongoose.model<sede_from_DB>("Sede", SedeSchema);
