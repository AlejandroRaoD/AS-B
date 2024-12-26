import { Request, Response } from "express";
import {
	createSede_service,
	deleteSede_service,
	getSedes_service,
	getOneSede_service,
	updateSede_service,
} from "./sede.service";
import { errorHandlerHelper } from "../../common/helpers/errorHandler.helper";
import { matchedData } from "express-validator";
import { sedeAttributes } from "./models/sede.model";
import { QuerySedeDto } from "./dto/query-sede.dto";

export const createSede_controller = async (req: Request, res: Response) => {
	try {
		const data = matchedData(req) as Omit<sedeAttributes, "_id" | "status">;

		const sede = await createSede_service(data);

		res.status(201).json({ data: sede });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getSedes_controller = async (req: Request, res: Response) => {
	const query = matchedData(req) as QuerySedeDto;

	try {
		const sedes = await getSedes_service(query);

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
		const data = matchedData(req) as Omit<
			sedeAttributes,
			"_id" | "status" | "nucleoId"
		>;
		const sede = await updateSede_service(id, data);

		res.json({ data: sede });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteSede_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		await deleteSede_service(id);

		res.json({ data: "ok" });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
