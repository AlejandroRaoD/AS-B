import { Request, Response } from "express";
import {
	createFurniture_service,
	deleteFurniture_service,
	getFurnitures_service,
	getOneFurniture_service,
	updateFurniture_service,
} from "./furniture.service";
import getFurnitureDataOfRequest from "./helpers/getFurnitureData.helper";
import { ErrorsMessages } from "../config/messages";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";

export const createFurniture_controller = async (
	req: Request,
	res: Response
) => {
	const data = getFurnitureDataOfRequest(req.body);

	try {
		const furniture = await createFurniture_service(data);

		res.status(201).json({ data: furniture });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getFurnitures_controller = async (
	_req: Request,
	res: Response
) => {
	// const query = req.query

	try {
		const furnitures = await getFurnitures_service();

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
		const { id: _id } = req.params;
		const data = getFurnitureDataOfRequest(req.body);

		const furniture = await updateFurniture_service(_id, data);

		res.json({ data: furniture });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.furniture.update });
	}
};

export const deleteFurniture_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;

		await deleteFurniture_service(_id);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.furniture.delete });
	}
};
