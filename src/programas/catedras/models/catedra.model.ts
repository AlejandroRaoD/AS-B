import mongoose, { Document } from "mongoose";

export enum catedraStatus {
	active = "a",
	inArchive = "ar",
	delete = "d",
}

export interface catedraAttributes {
	_id: string;
	programaId: string;
	name: string;
	description: string;
	status: catedraStatus;
}

export interface catedra_from_DB
	extends Omit<catedraAttributes, "_id">,
		Document {}

const CatedraSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, require: true },
		description: { type: String, trim: true, default: "" },
		programaId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Programa",
			require: true,
		},
		status: { type: String, trim: true, default: catedraStatus.active },
	},
	{ timestamps: true }
);

export default mongoose.model<catedra_from_DB>("Catedra", CatedraSchema);
