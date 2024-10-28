import { Request, Response } from "express";
import { ErrorsMessages } from "../config/messages";
import getNucleoDataOfRequest from "../helpers/getNucleoData.helper";
import {
	createNucleo_service,
	deleteNucleo_service,
	getNucleos_service,
	getOneNucleo_service,
	updateNucleo_service,
} from "../services/nucleo.service";

export const createNucleo_controller = async (req: Request, res: Response) => {
	const data = getNucleoDataOfRequest(req.body);

	try {
		const nucleo = await createNucleo_service(data);

		res.status(201).json({ data: nucleo });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.user.notFound });
	}
};

export const getNucleos_controller = async (_req: Request, res: Response) => {
	// const query = req.query

	try {
		const nucleos = await getNucleos_service();

		res.status(200).json({ data: nucleos });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.user.notFound });
	}
};

export const getOneNucleo_controller = async (req: Request, res: Response) => {
	const { id: _id } = req.params;

	try {
		const nucleo = await getOneNucleo_service(_id);

		res.status(200).json({ data: nucleo });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.user.notFound });
	}
};

export const updateNucleo_controller = async (req: Request, res: Response) => {
	try {
		const { id: _id } = req.params;
		const data = getNucleoDataOfRequest(req.body);

		const nucleo = await updateNucleo_service(_id, data);

		res.json({ data: nucleo });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.nucleo.update });
	}
};

export const deleteNucleo_controller = async (req: Request, res: Response) => {
	try {
		const { id: _id } = req.params;

		await deleteNucleo_service(_id);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.nucleo.delete });
	}
};
