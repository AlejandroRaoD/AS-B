import { Request, Response } from "express";
import {
	createFiam_service,
	deleteFiam_service,
	getFiams_service,
	getOneFiam_service,
	updateFiam_service,
} from "./fiam.service";
import { errorHandlerHelper } from "../../common/helpers/errorHandler.helper";
import { CreateFiamDto } from "./dto/create-fiam.dto";
import { matchedData } from "express-validator";
import { QueryFiamDto } from "./dto/query-fiam.dto";
import { UpdateFiamDto } from "./dto/update-fiam.dto";

export const createFiam_controller = async (req: Request, res: Response) => {
	const data = matchedData(req) as CreateFiamDto;

	try {
		const fiam = await createFiam_service(data);

		res.status(201).json({ data: fiam });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getFiams_controller = async (req: Request, res: Response) => {
	const query = matchedData(req) as QueryFiamDto;

	try {
		const fiams = await getFiams_service(query);

		res.status(200).json({ data: fiams });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneFiam_controller = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const fiam = await getOneFiam_service(id);

		res.status(200).json({ data: fiam });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateFiam_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const data = matchedData(req) as UpdateFiamDto;

		const fiam = await updateFiam_service(id, data);

		res.json({ data: fiam });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteFiam_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		await deleteFiam_service(id);

		res.json({ data: "ok" });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
