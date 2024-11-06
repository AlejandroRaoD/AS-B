import { Request, Response } from "express";
import { ErrorsMessages } from "../../config/messages";
import {
	createSede_service,
	deleteSede_service,
	getSedes_service,
	getOneSede_service,
	updateSede_service,
} from "./sede.service";
import getSedeDataOfRequest from "./helpers/getSedeData.helper";
import { errorHandlerHelper } from "../../common/helpers/errorHandler.helper";

export const createSede_controller = async (req: Request, res: Response) => {
	const data = getSedeDataOfRequest(req.body);

	try {
		const sede = await createSede_service(data);

		res.status(201).json({ data: sede });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getSedes_controller = async (_req: Request, res: Response) => {
	// const query = req.query

	try {
		const sedes = await getSedes_service();

		res.status(200).json({ data: sedes });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneSede_controller = async (req: Request, res: Response) => {
	const { id: _id } = req.params;

	try {
		const sede = await getOneSede_service(_id);

		res.status(200).json({ data: sede });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateSede_controller = async (req: Request, res: Response) => {
	try {
		const { id: _id } = req.params;
		const data = getSedeDataOfRequest(req.body);

		const sede = await updateSede_service(_id, data);

		res.json({ data: sede });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: ErrorsMessages.sede.update });
	}
};

export const deleteSede_controller = async (req: Request, res: Response) => {
	try {
		const { id: _id } = req.params;

		await deleteSede_service(_id);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);

		res.status(500).json({ error: true, message: ErrorsMessages.sede.delete });
	}
};
