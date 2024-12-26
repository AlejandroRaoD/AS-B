import mongoose from "mongoose";

export enum programaStatus {
	active = "a",
	inArchive = "ar",
	delete = "d",
}

export interface programaAttributes {
	_id: string;
	name: string;
	description: string;
	sedeId: String;
	directorId: String;
	status: programaStatus;
}

export interface programa_from_DB
	extends Omit<programaAttributes, "_id">,
		Document {}

const ProgramaSchema = new mongoose.Schema(
	{
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
		status: { type: String, trim: true, default: programaStatus.active },
	},
	{ timestamps: true }
);

export default mongoose.model<programa_from_DB>("Programa", ProgramaSchema);
