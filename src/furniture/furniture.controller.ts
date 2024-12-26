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

export const createFurniture_controller = async (
	req: Request,
	res: Response
) => {
	const data = matchedData(req) as CreateFurnitureDto;

	try {
		const furniture = await createFurniture_service(data);

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

		await deleteFurniture_service(id);

		res.json({ ok: true });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
