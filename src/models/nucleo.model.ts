import mongoose from "mongoose";

export interface nucleoAttributes {
	_id: string;
	name: string;
}

export interface nucleo_from_DB
	extends Omit<nucleoAttributes, "_id">,
		Document {}

const NucleoSchema = new mongoose.Schema({
	name: { type: String, trim: true, require: true, unique: true },
});

export default mongoose.model<nucleo_from_DB>("Nucleo", NucleoSchema);
