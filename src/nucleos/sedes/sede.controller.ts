import { Request, Response } from "express";
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
	
	try {
		const data = getSedeDataOfRequest(req.body);
		
		const sede = await createSede_service(data);

		res.status(201).json({ data: sede });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getSedes_controller = async (_req: Request, res: Response) => {
	try {
		const sedes = await getSedes_service();

		res.status(200).json({ data: sedes });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneSede_controller = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const sede = await getOneSede_service(id);

		res.status(200).json({ data: sede });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateSede_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const data = getSedeDataOfRequest(req.body);

		const sede = await updateSede_service(id, data);

		res.json({ data: sede });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteSede_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const sede = await deleteSede_service(id);

		res.json({ data: sede });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
