import { Request, Response } from "express";
import {
	createPrograma_service,
	deletePrograma_service,
	getProgramas_service,
	getOnePrograma_service,
	updatePrograma_service,
} from "./programa.service";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { matchedData } from "express-validator";
import { CreateProgramaDto } from "./dto/create-programa.dto";
import { QueryProgramaDto } from "./dto/query-programa.dto";
import { UpdateProgramaDto } from "./dto/update-programa.dto";
import { createSystemLog_service } from "../systemLog/systemLog.service";
import { SystemAction } from "../systemLog/models/systemLog.model";
import { moduleItems } from "../config/messages";

export const createPrograma_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const data = matchedData(req) as CreateProgramaDto;
		const programa = await createPrograma_service(data);
		await createSystemLog_service({
			systemAction: SystemAction.create,
			moduleItem: moduleItems.programa,
			itemId: programa._id.toString(),
			text: programa.name,
			userId: req.user._id,
			userEmail: req.user.email,
		});
		res.status(201).json({ data: programa });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getProgramas_controller = async (req: Request, res: Response) => {
	try {
		const query = matchedData(req) as QueryProgramaDto;

		const programas = await getProgramas_service(query);

		res.status(200).json({ data: programas });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOnePrograma_controller = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	try {
		const programa = await getOnePrograma_service(id);

		res.status(200).json({ data: programa });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updatePrograma_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		const data = matchedData(req.body) as UpdateProgramaDto;

		const programa = await updatePrograma_service(id, data);
		await createSystemLog_service({
			systemAction: SystemAction.update,
			moduleItem: moduleItems.programa,
			itemId: programa._id.toString(),
			text: programa.name,
			userId: req.user._id,
			userEmail: req.user.email,
		});
		res.json({ data: programa });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deletePrograma_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;

		const programa = await deletePrograma_service(id);

		await createSystemLog_service({
			systemAction: SystemAction.delete,
			moduleItem: moduleItems.programa,
			itemId: programa._id.toString(),
			text: programa.name,
			userId: req.user._id,
			userEmail: req.user.email,
		});

		res.json({ data: "ok" });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
