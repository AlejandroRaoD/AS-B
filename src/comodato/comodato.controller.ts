import { Request, Response } from "express";
import {
	createComodato_service,
	deleteComodato_service,
	getComodatos_service,
	getOneComodato_service,
	updateComodato_service,
} from "./comodato.service";
import getComodatoDataOfRequest from "./helpers/getComodatoData.helper";
import { ErrorsMessages } from "../config/messages";

export const createComodato_controller = async (
	req: Request,
	res: Response
) => {
	const data = getComodatoDataOfRequest(req.body);

	try {
		const comodato = await createComodato_service(data);

		res.status(201).json({ data: comodato });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.user.notFound });
	}
};

export const getComodatos_controller = async (_req: Request, res: Response) => {
	// const query = req.query

	try {
		const comodatos = await getComodatos_service();

		res.status(200).json({ data: comodatos });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.user.notFound });
	}
};

export const getOneComodato_controller = async (
	req: Request,
	res: Response
) => {
	const { id: _id } = req.params;

	try {
		const comodato = await getOneComodato_service(_id);

		res.status(200).json({ data: comodato });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.user.notFound });
	}
};

export const updateComodato_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;
		const data = getComodatoDataOfRequest(req.body);

		const comodato = await updateComodato_service(_id, data);

		res.json({ data: comodato });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.comodato.update });
	}
};

export const deleteComodato_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;

		await deleteComodato_service(_id);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.comodato.delete });
	}
};
