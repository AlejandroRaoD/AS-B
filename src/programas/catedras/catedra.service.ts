import { ErrorsMessages } from "../../config/messages";
import catedraModel, {
	catedraAttributes,
	catedra_from_DB,
} from "./models/catedra.model";

export const createCatedra_service = async (
	data: catedraAttributes
): Promise<catedra_from_DB> => {
	try {
		const catedra = new catedraModel(data);

		await catedra.save();

		return catedra;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.catedra.notCreated);
	}
};

export const getCatedras_service = async (): Promise<catedra_from_DB[]> => {
	try {
		const catedras = await catedraModel.find();

		return catedras;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.catedra.whenObtaining);
	}
};

export const getOneCatedra_service = async (
	_id: string
): Promise<catedra_from_DB> => {
	try {
		const catedra = await catedraModel.findById(_id);

		return catedra;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.catedra.whenObtaining);
	}
};

export const updateCatedra_service = async (
	_id: string,
	data: catedraAttributes
): Promise<catedra_from_DB> => {
	try {
		await catedraModel.updateOne({ _id }, data);

		const catedra = catedraModel.findById(_id);

		return catedra;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.catedra.whenObtaining);
	}
};

export const deleteCatedra_service = async (_id: string): Promise<void> => {
	try {
		const result = await catedraModel.deleteOne({ _id });

		console.log(result);

		if (!result.deletedCount) throw new Error(ErrorsMessages.catedra.notFound);
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.catedra.whenObtaining);
	}
};
