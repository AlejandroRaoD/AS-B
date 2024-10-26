import mongoose from "mongoose";

export interface programaAttributes {
	_id: string;
	name: string;
	description: string;
	sedeId: String;
	directorId: String;
}

export interface programa_from_DB
	extends Omit<programaAttributes, "_id">,
		Document {}

const ProgramaSchema = new mongoose.Schema({
	name: { type: String, trim: true, require: true },
	description: { type: String, trim: true, default: "" },
	
	sedeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Sede",
		require: true,
	},

	directorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
		require: true,
	},
});

export default mongoose.model<programa_from_DB>("Programa", ProgramaSchema);
