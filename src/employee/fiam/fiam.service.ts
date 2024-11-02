import { ErrorsMessages } from "../../config/messages";
import fiamModel, { fiamAttributes, fiam_from_DB } from "./models/fiam.model";

export const createFiam_service = async (
	data: fiamAttributes
): Promise<fiam_from_DB> => {
	try {
		const fiam = new fiamModel(data);

		await fiam.save();

		return fiam;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.fiam.notCreated);
	}
};

export const getFiams_service = async (): Promise<fiam_from_DB[]> => {
	try {
		const fiams = await fiamModel.find();

		return fiams;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.fiam.whenObtaining);
	}
};

export const getOneFiam_service = async (
	_id: string
): Promise<fiam_from_DB> => {
	try {
		const fiam = await fiamModel.findById(_id);

		return fiam;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.fiam.whenObtaining);
	}
};

export const updateFiam_service = async (
	_id: string,
	data: fiamAttributes
): Promise<fiam_from_DB> => {
	try {
		await fiamModel.updateOne({ _id }, data);

		const fiam = fiamModel.findById(_id);

		return fiam;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.fiam.whenObtaining);
	}
};

export const deleteFiam_service = async (_id: string): Promise<void> => {
	try {
		const result = await fiamModel.deleteOne({ _id });

		console.log(result);

		if (!result.deletedCount) throw new Error(ErrorsMessages.fiam.notFound);
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.fiam.whenObtaining);
	}
};
