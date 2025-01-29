import mongoose from "mongoose";
import { moduleItems } from "../../config/messages";

export enum SystemAction {
	login = "login",
	create = "create",
	edit = "edit",
	update = "update",
	delete = "delete",
}

export interface systemLogAttributes {
	_id: string;
	userId: string;
	userEmail: string;
	systemAction: SystemAction;
	moduleItem?: moduleItems | null;
	itemId?: string | null;
	text?: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface systemLog_from_DB
	extends Omit<systemLogAttributes, "_id">,
		Document {}

const SystemLogSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		
		userEmail: {
			type: String,
		},

		systemAction: {
			type: String,
			require: true,
			enum: SystemAction,
		},
		itemId: {
			type: String,
			default: null,
		},
		moduleItem: {
			type: String,
			enum: moduleItems,
			default: null,
		},
		text: { type: String, default: "" },
	},
	{ timestamps: true }
);

export default mongoose.model<systemLog_from_DB>("SystemLog", SystemLogSchema);
