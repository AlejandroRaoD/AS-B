import { Request, Response } from "express";
import {
	createInstrument_service,
	deleteInstrument_service,
	getInstruments_service,
	getOneInstrument_service,
	updateInstrument_service,
} from "./instrument.service";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { CreateInstrumentDto } from "./dto/create-instrument.dto";
import { matchedData } from "express-validator";
import { QueryInstrumentDto } from "./dto/query-instrument.dto";
import { UpdateInstrumentDto } from "./dto/update-instrument.dto";

export const createInstrument_controller = async (
	req: Request,
	res: Response
) => {
	const data = matchedData(req) as CreateInstrumentDto;

	try {
		const instrument = await createInstrument_service(data);

		res.status(201).json({ data: instrument });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getInstruments_controller = async (
	req: Request,
	res: Response
) => {
	const query = matchedData(req) as QueryInstrumentDto;

	try {
		const instruments = await getInstruments_service(query);

		res.status(200).json({ data: instruments });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneInstrument_controller = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	try {
		const instrument = await getOneInstrument_service(id);

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

		const data = matchedData(req) as UpdateInstrumentDto;

		const instrument = await updateInstrument_service(_id, data);

		res.json({ data: instrument });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteInstrument_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;

		await deleteInstrument_service(id);

		res.json({ data: "ok" });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
