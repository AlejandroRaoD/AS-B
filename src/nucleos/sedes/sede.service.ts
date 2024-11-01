// ****************************************************************************
// 										             creacion
// ****************************************************************************

import { ErrorsMessages } from "../../config/messages";
import sedeModel, { sedeAttributes, sede_from_DB } from "./models/sede.model";

export const createSede_service = async (
	data: sedeAttributes
): Promise<sede_from_DB> => {
	try {
		const sede = new sedeModel(data);

		await sede.save();

		return sede;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.sede.notCreated);
	}
};

export const getSedes_service = async (): Promise<sede_from_DB[]> => {
	try {
		const sedes = await sedeModel.find();

		return sedes;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.sede.whenObtaining);
	}
};

export const getOneSede_service = async (
	_id: string
): Promise<sede_from_DB> => {
	try {
		const sede = await sedeModel.findById(_id);

		return sede;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.sede.whenObtaining);
	}
};

export const updateSede_service = async (
	_id: string,
	data: sedeAttributes
): Promise<sede_from_DB> => {
	try {
		await sedeModel.updateOne({ _id }, data);

		const sede = sedeModel.findById(_id);

		return sede;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.sede.whenObtaining);
	}
};

export const deleteSede_service = async (_id: string): Promise<void> => {
	try {
		const result = await sedeModel.deleteOne({ _id });

		console.log(result);

		if (!result.deletedCount) throw new Error(ErrorsMessages.sede.notFound);
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.sede.whenObtaining);
	}
};
