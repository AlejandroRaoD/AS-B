import { Request, Response } from "express";
import {
	createFurniture_service,
	deleteFurniture_service,
	getFurnitures_service,
	getOneFurniture_service,
	updateFurniture_service,
} from "./furniture.service";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { CreateFurnitureDto } from "./dto/create-furniture.dto";
import { matchedData } from "express-validator";
import { QueryFurnitureDto } from "./dto/query-furniture.dto";
import { UpdateRepresentativeDto } from "../representative/dto/update-student.dto";
import { createSystemLog_service } from "../systemLog/systemLog.service";
import { SystemAction } from "../systemLog/models/systemLog.model";
import { moduleItems } from "../config/messages";

export const createFurniture_controller = async (
	req: Request,
	res: Response
) => {
	const data = matchedData(req) as CreateFurnitureDto;

	try {
		const furniture = await createFurniture_service(data);

		await createSystemLog_service({
			systemAction: SystemAction.create,
			moduleItem: moduleItems.furniture,
			itemId: furniture._id.toString(),
			text: furniture.name,
			userId: req.user._id,
			userEmail: req.user.email,
		});

		res.status(201).json({ data: furniture });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getFurnitures_controller = async (req: Request, res: Response) => {
	const query = matchedData(req) as QueryFurnitureDto;

	try {
		const furnitures = await getFurnitures_service(query);

		res.status(200).json({ data: furnitures });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneFurniture_controller = async (
	req: Request,
	res: Response
) => {
	const { id: _id } = req.params;

	try {
		const furniture = await getOneFurniture_service(_id);

		res.status(200).json({ data: furniture });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateFurniture_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		const data = matchedData(req) as UpdateRepresentativeDto;

		const furniture = await updateFurniture_service(id, data);
		await createSystemLog_service({
			systemAction: SystemAction.update,
			moduleItem: moduleItems.furniture,
			itemId: furniture._id.toString(),
			text: furniture.name,
			userId: req.user._id,
			userEmail: req.user.email,
		});
		res.json({ data: furniture });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteFurniture_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;

		const furniture = await deleteFurniture_service(id);
		await createSystemLog_service({
			systemAction: SystemAction.delete,
			moduleItem: moduleItems.furniture,
			itemId: furniture._id.toString(),
			text: furniture.name,
			userId: req.user._id,
			userEmail: req.user.email,
		});
		res.json({ ok: true });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
