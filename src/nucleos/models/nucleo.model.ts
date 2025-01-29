import mongoose, { Document } from "mongoose";

export enum nucleoStatus {
	active = "a",
	inArchive = "ar",
	delete = "d",
}
export interface nucleoAttributes {
	_id: string;
	name: string;
	status: nucleoStatus;
}

export interface nucleo_from_DB
	extends Omit<nucleoAttributes, "_id">,
		Document {
	_id: mongoose.Schema.Types.ObjectId;
}

const NucleoSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, require: true, unique: true },
		status: { type: String, trim: true, default: nucleoStatus.active },
	},
	{ timestamps: true }
);

export default mongoose.model<nucleo_from_DB>("Nucleo", NucleoSchema);
