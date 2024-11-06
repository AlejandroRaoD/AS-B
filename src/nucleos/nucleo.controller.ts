import { Request, Response } from "express";
import getNucleoDataOfRequest from "./helpers/getNucleoData.helper";
import {
	createNucleo_service,
	deleteNucleo_service,
	getNucleos_service,
	getOneNucleo_service,
	updateNucleo_service,
} from "./nucleo.service";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";

export const createNucleo_controller = async (req: Request, res: Response) => {
	const data = getNucleoDataOfRequest(req.body);

	try {
		const nucleo = await createNucleo_service(data);

		res.status(201).json({ data: nucleo });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getNucleos_controller = async (_req: Request, res: Response) => {
	try {
		const nucleos = await getNucleos_service();

		res.status(200).json({ data: nucleos });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneNucleo_controller = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const nucleo = await getOneNucleo_service(id);

		res.status(200).json({ data: nucleo });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateNucleo_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const data = getNucleoDataOfRequest(req.body);

		const nucleo = await updateNucleo_service(id, data);

		res.json({ data: nucleo });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteNucleo_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const nucleo = await deleteNucleo_service(id);

		res.json({ data: nucleo });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
