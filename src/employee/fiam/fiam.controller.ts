import { Request, Response } from "express";
import {
	createFiam_service,
	deleteFiam_service,
	getFiams_service,
	getOneFiam_service,
	updateFiam_service,
} from "./fiam.service";
import getFiamDataOfRequest from "./helpers/getFiamData.helper";
import { ErrorMsg } from "../../config/messages";
import { errorHandlerHelper } from "../../common/helpers/errorHandler.helper";

export const createFiam_controller = async (req: Request, res: Response) => {
	const data = getFiamDataOfRequest(req.body);

	try {
		const fiam = await createFiam_service(data);

		res.status(201).json({ data: fiam });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getFiams_controller = async (_req: Request, res: Response) => {
	// const query = req.query

	try {
		const fiams = await getFiams_service();

		res.status(200).json({ data: fiams });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneFiam_controller = async (req: Request, res: Response) => {
	const { id: _id } = req.params;

	try {
		const fiam = await getOneFiam_service(_id);

		res.status(200).json({ data: fiam });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateFiam_controller = async (req: Request, res: Response) => {
	try {
		const { id: _id } = req.params;
		const data = getFiamDataOfRequest(req.body);

		const fiam = await updateFiam_service(_id, data);

		res.json({ data: fiam });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: ErrorMsg.fiam.update });
	}
};

export const deleteFiam_controller = async (req: Request, res: Response) => {
	try {
		const { id: _id } = req.params;

		await deleteFiam_service(_id);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);

		res.status(500).json({ error: true, message: ErrorMsg.fiam.delete });
	}
};
