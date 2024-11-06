import { Response } from "express";
import { ErrorsMessages } from "../../config/messages";

export const errorHandlerHelper = async (error: any, res: Response) => {
	console.log(error);

	if (error.code === 11000) {
		res
			.status(400)
			.json({ error: true, message: ErrorsMessages.common.duplicate });

		return;
	}

	res.status(error.status).json({ error: true, message: error.message });
};
