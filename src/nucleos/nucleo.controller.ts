import { Request, Response } from "express";
import {
	createNucleo_service,
	deleteNucleo_service,
	getNucleos_service,
	getOneNucleo_service,
	updateNucleo_service,
} from "./nucleo.service";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { matchedData } from "express-validator";
import { nucleoAttributes } from "./models/nucleo.model";
import { QueryNucleoDto } from "./dto/query-nucleo.dto";
import { createSystemLog_service } from "../systemLog/systemLog.service";
import { SystemAction } from "../systemLog/models/systemLog.model";
import { moduleItems } from "../config/messages";

export const createNucleo_controller = async (req: Request, res: Response) => {
	try {
		const data = matchedData(req) as Omit<nucleoAttributes, "_id" | "status">;

		const nucleo = await createNucleo_service(data);
		await createSystemLog_service({
			systemAction: SystemAction.create,
			moduleItem: moduleItems.nucleo,
			itemId: nucleo._id.toString(),
			text: nucleo.name,
			userId: req.user._id,
			userEmail: req.user.email,
		});
		res.status(201).json({ data: nucleo });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getNucleos_controller = async (req: Request, res: Response) => {
	const query = matchedData(req) as QueryNucleoDto;

	try {
		const nucleos = await getNucleos_service(query);

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
		const data = matchedData(req) as Omit<nucleoAttributes, "_id" | "status">;

		const nucleo = await updateNucleo_service(id, data);
		await createSystemLog_service({
			systemAction: SystemAction.update,
			moduleItem: moduleItems.nucleo,
			itemId: nucleo._id.toString(),
			text: nucleo.name,
			userId: req.user._id,
			userEmail: req.user.email,
		});
		res.json({ data: nucleo });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteNucleo_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		// const nucleo =
		const nucleo = await deleteNucleo_service(id);
		await createSystemLog_service({
			systemAction: SystemAction.delete,
			moduleItem: moduleItems.nucleo,
			itemId: nucleo._id.toString(),
			text: nucleo.name,
			userId: req.user._id,
			userEmail: req.user.email,
		});
		res.json({ data: "ok" });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
