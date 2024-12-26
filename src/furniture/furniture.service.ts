import { NotFoundException } from "../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../config/messages";
import { CreateFurnitureDto } from "./dto/create-furniture.dto";
import { QueryFurnitureDto } from "./dto/query-furniture.dto";
import { UpdateFurnitureDto } from "./dto/update-furniture.dto";
import furnitureModel, { furniture_from_DB } from "./models/furniture.model";

export const createFurniture_service = async (
	createFurnitureDto: CreateFurnitureDto
): Promise<furniture_from_DB> => {
	const furniture = new furnitureModel(createFurnitureDto);

	await furniture.save();

	return furniture;
};

export const getFurnitures_service = async (
	queryFurnitureDto: QueryFurnitureDto
): Promise<furniture_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = queryFurnitureDto;

	const furnitures = await furnitureModel.find(query);

	return furnitures;
};

export const getOneFurniture_service = async (
	id: string
): Promise<furniture_from_DB> => {
	const furniture = await furnitureModel.findById(id);

	if (!furniture)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.furniture));

	return furniture;
};

export const updateFurniture_service = async (
	id: string,
	data: UpdateFurnitureDto
): Promise<furniture_from_DB> => {
	const furniture = await furnitureModel.findByIdAndUpdate(id, data, {
		new: true,
	});

	if (!furniture)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.furniture));

	return furniture;
};

export const deleteFurniture_service = async (_id: string): Promise<void> => {
	const result = await furnitureModel.deleteOne({ _id });

	if (!result.deletedCount)
		throw new Error(ErrorMsg.notFound(moduleItems.furniture));
};
