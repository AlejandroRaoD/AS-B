import { Request, Response } from "express";
import {
	createCatedra_service,
	deleteCatedra_service,
	getCatedras_service,
	getOneCatedra_service,
	updateCatedra_service,
} from "./catedra.service";
import { errorHandlerHelper } from "../../common/helpers/errorHandler.helper";
import { matchedData } from "express-validator";
import { CreateCatedraDto } from "./dto/create-catedra.dto";
import { QueryCatedraDto } from "./dto/query-catedra.dto";
import { UpdateCatedraDto } from "./dto/update-catedra.dto";

export const createCatedra_controller = async (req: Request, res: Response) => {
	try {
		const createCatedraDto = matchedData(req) as CreateCatedraDto;

		const catedra = await createCatedra_service(createCatedraDto);

		res.status(201).json({ data: catedra });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getCatedras_controller = async (req: Request, res: Response) => {
	try {
		const queryCatedraDto = matchedData(req) as QueryCatedraDto;
		const catedras = await getCatedras_service(queryCatedraDto);

		res.status(200).json({ data: catedras });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneCatedra_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const catedra = await getOneCatedra_service(id);

		res.status(200).json({ data: catedra });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateCatedra_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updateCatedraDto = matchedData(req) as UpdateCatedraDto;

		const catedra = await updateCatedra_service(id, updateCatedraDto);

		res.json({ data: catedra });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteCatedra_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const catedra = await deleteCatedra_service(id);

		res.json({ data: catedra });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
