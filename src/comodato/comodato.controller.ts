import { Request, Response } from "express";
import {
	createComodato_service,
	deleteComodato_service,
	getComodatos_service,
	getOneComodato_service,
	updateComodato_service,
} from "./comodato.service";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { matchedData } from "express-validator";
import { CreateComodatoDto } from "./dto/create-comodato.dto";
import { QueryComodatoDto } from "./dto/query-comodato.dto";
import { UpdateComodatoDto } from "./dto/update-comodato.dto";
import { createSystemLog_service } from "../systemLog/systemLog.service";
import { SystemAction } from "../systemLog/models/systemLog.model";
import { moduleItems } from "../config/messages";

export const createComodato_controller = async (
	req: Request,
	res: Response
) => {
	const data = matchedData(req) as CreateComodatoDto;

	try {
		const comodato = await createComodato_service(data);

		await createSystemLog_service({
			systemAction: SystemAction.create,
			moduleItem: moduleItems.comodato,
			itemId: comodato._id.toString(),
			text: comodato.instrumentId,
			userId: req.user._id,
			userEmail: req.user.email,
		});

		res.status(201).json({ data: comodato });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getComodatos_controller = async (req: Request, res: Response) => {
	const query = matchedData(req) as QueryComodatoDto;

	try {
		const comodatos = await getComodatos_service(query);

		res.status(200).json({ data: comodatos });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneComodato_controller = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	try {
		const comodato = await getOneComodato_service(id);

		res.status(200).json({ data: comodato });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateComodato_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		const data = matchedData(req) as UpdateComodatoDto;

		const comodato = await updateComodato_service(id, data);

		await createSystemLog_service({
			systemAction: SystemAction.update,
			moduleItem: moduleItems.comodato,
			itemId: comodato._id.toString(),
			text: comodato.instrumentId,
			userId: req.user._id,
			userEmail: req.user.email,
		});

		res.json({ data: comodato });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteComodato_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;

		const comodato = await deleteComodato_service(id);

		await createSystemLog_service({
			systemAction: SystemAction.delete,
			moduleItem: moduleItems.comodato,
			itemId: comodato._id.toString(),
			text: comodato.instrumentId,
			userId: req.user._id,
			userEmail: req.user.email,
		});

		res.json({ data: "ok" });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
