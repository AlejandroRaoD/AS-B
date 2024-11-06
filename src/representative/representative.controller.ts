import { Request, Response } from "express";
import {
	createRepresentative_service,
	deleteRepresentative_service,
	getRepresentatives_service,
	getOneRepresentative_service,
	updateRepresentative_service,
} from "./representative.service";
import getRepresentativeDataOfRequest from "./helpers/getRepresentativeData.helper";
import { ErrorsMessages } from "../config/messages";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";

export const createRepresentative_controller = async (
	req: Request,
	res: Response
) => {
	const data = getRepresentativeDataOfRequest(req.body);

	try {
		const representative = await createRepresentative_service(data);

		res.status(201).json({ data: representative });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getRepresentatives_controller = async (
	_req: Request,
	res: Response
) => {
	// const query = req.query

	try {
		const representatives = await getRepresentatives_service();

		res.status(200).json({ data: representatives });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneRepresentative_controller = async (
	req: Request,
	res: Response
) => {
	const { id: _id } = req.params;

	try {
		const representative = await getOneRepresentative_service(_id);

		res.status(200).json({ data: representative });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateRepresentative_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;
		const data = getRepresentativeDataOfRequest(req.body);

		const representative = await updateRepresentative_service(_id, data);

		res.json({ data: representative });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.representative.update });
	}
};

export const deleteRepresentative_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;

		await deleteRepresentative_service(_id);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.representative.delete });
	}
};
