import { Request, Response } from "express";
import {
	createRepresentative_service,
	deleteRepresentative_service,
	getRepresentatives_service,
	getOneRepresentative_service,
	updateRepresentative_service,
} from "./representative.service";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { matchedData } from "express-validator";
import { CreateRepresentativeDto } from "./dto/create-representative.dto";
import { QueryRepresentativeDto } from "./dto/query-representative.dto";
import { UpdateRepresentativeDto } from "./dto/update-student.dto";

export const createRepresentative_controller = async (
	req: Request,
	res: Response
) => {
	const data = matchedData(req) as CreateRepresentativeDto;

	try {
		const representative = await createRepresentative_service(data);

		res.status(201).json({ data: representative });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getRepresentatives_controller = async (
	req: Request,
	res: Response
) => {
	const query = matchedData(req) as QueryRepresentativeDto;

	try {
		const representatives = await getRepresentatives_service(query);

		res.status(200).json({ data: representatives });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneRepresentative_controller = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	try {
		const representative = await getOneRepresentative_service(id);

		res.status(200).json({ data: representative });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateRepresentative_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		const data = matchedData(req) as UpdateRepresentativeDto;

		const representative = await updateRepresentative_service(id, data);

		res.json({ data: representative });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteRepresentative_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;

		await deleteRepresentative_service(id);

		res.json({ data: "ok" });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
