import { Request, Response } from "express";
import {
	createInstrument_service,
	deleteInstrument_service,
	getInstruments_service,
	getOneInstrument_service,
	updateInstrument_service,
} from "./instrument.service";
import getInstrumentDataOfRequest from "./helpers/getInstrumentData.helper";
import { ErrorsMessages } from "../config/messages";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";

export const createInstrument_controller = async (
	req: Request,
	res: Response
) => {
	const data = getInstrumentDataOfRequest(req.body);

	try {
		const instrument = await createInstrument_service(data);

		res.status(201).json({ data: instrument });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getInstruments_controller = async (
	_req: Request,
	res: Response
) => {
	// const query = req.query

	try {
		const instruments = await getInstruments_service();

		res.status(200).json({ data: instruments });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneInstrument_controller = async (
	req: Request,
	res: Response
) => {
	const { id: _id } = req.params;

	try {
		const instrument = await getOneInstrument_service(_id);

		res.status(200).json({ data: instrument });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateInstrument_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;
		const data = getInstrumentDataOfRequest(req.body);

		const instrument = await updateInstrument_service(_id, data);

		res.json({ data: instrument });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.instrument.update });
	}
};

export const deleteInstrument_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;

		await deleteInstrument_service(_id);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.instrument.delete });
	}
};
