import { Request, Response } from "express";
import {
	createPrograma_service,
	deletePrograma_service,
	getProgramas_service,
	getOnePrograma_service,
	updatePrograma_service,
} from "./programa.service";
import getProgramaDataOfRequest from "./helpers/getProgramaData.helper";
import { ErrorsMessages } from "../config/messages";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";

export const createPrograma_controller = async (
	req: Request,
	res: Response
) => {
	const data = getProgramaDataOfRequest(req.body);

	try {
		const programa = await createPrograma_service(data);

		res.status(201).json({ data: programa });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getProgramas_controller = async (_req: Request, res: Response) => {
	// const query = req.query

	try {
		const programas = await getProgramas_service();

		res.status(200).json({ data: programas });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOnePrograma_controller = async (
	req: Request,
	res: Response
) => {
	const { id: _id } = req.params;

	try {
		const programa = await getOnePrograma_service(_id);

		res.status(200).json({ data: programa });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updatePrograma_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;
		const data = getProgramaDataOfRequest(req.body);

		const programa = await updatePrograma_service(_id, data);

		res.json({ data: programa });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.programa.update });
	}
};

export const deletePrograma_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;

		await deletePrograma_service(_id);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.programa.delete });
	}
};
