import { Request, Response } from "express";
import {
	createCatedra_service,
	deleteCatedra_service,
	getCatedras_service,
	getOneCatedra_service,
	updateCatedra_service,
} from "./catedra.service";
import getCatedraDataOfRequest from "./helpers/getCatedraData.helper";
import { ErrorsMessages } from "../../config/messages";

export const createCatedra_controller = async (
	req: Request,
	res: Response
) => {
	const data = getCatedraDataOfRequest(req.body);

	try {
		const catedra = await createCatedra_service(data);

		res.status(201).json({ data: catedra });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.user.notFound });
	}
};

export const getCatedras_controller = async (_req: Request, res: Response) => {
	// const query = req.query

	try {
		const catedras = await getCatedras_service();

		res.status(200).json({ data: catedras });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.user.notFound });
	}
};

export const getOneCatedra_controller = async (
	req: Request,
	res: Response
) => {
	const { id: _id } = req.params;

	try {
		const catedra = await getOneCatedra_service(_id);

		res.status(200).json({ data: catedra });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.user.notFound });
	}
};

export const updateCatedra_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;
		const data = getCatedraDataOfRequest(req.body);

		const catedra = await updateCatedra_service(_id, data);

		res.json({ data: catedra });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.catedra.update });
	}
};

export const deleteCatedra_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;

		await deleteCatedra_service(_id);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.catedra.delete });
	}
};