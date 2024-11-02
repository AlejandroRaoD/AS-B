import { ErrorsMessages } from "../config/messages";
import furnitureModel, {
	furnitureAttributes,
	furniture_from_DB,
} from "./models/furniture.model";

export const createFurniture_service = async (
	data: furnitureAttributes
): Promise<furniture_from_DB> => {
	try {
		const furniture = new furnitureModel(data);

		await furniture.save();

		return furniture;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.furniture.notCreated);
	}
};

export const getFurnitures_service = async (): Promise<furniture_from_DB[]> => {
	try {
		const furnitures = await furnitureModel.find();

		return furnitures;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.furniture.whenObtaining);
	}
};

export const getOneFurniture_service = async (
	_id: string
): Promise<furniture_from_DB> => {
	try {
		const furniture = await furnitureModel.findById(_id);

		return furniture;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.furniture.whenObtaining);
	}
};

export const updateFurniture_service = async (
	_id: string,
	data: furnitureAttributes
): Promise<furniture_from_DB> => {
	try {
		await furnitureModel.updateOne({ _id }, data);

		const furniture = furnitureModel.findById(_id);

		return furniture;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.furniture.whenObtaining);
	}
};

export const deleteFurniture_service = async (_id: string): Promise<void> => {
	try {
		const result = await furnitureModel.deleteOne({ _id });

		console.log(result);

		if (!result.deletedCount) throw new Error(ErrorsMessages.furniture.notFound);
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.furniture.whenObtaining);
	}
};
