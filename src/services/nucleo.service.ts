import { ErrorsMessages } from "../config/messages";
import nucleoModel, {
	nucleo_from_DB,
	nucleoAttributes,
} from "../models/nucleo.model";

// ****************************************************************************
// 										             creacion
// ****************************************************************************

export const createNucleo_service = async (
	data: nucleoAttributes
): Promise<nucleo_from_DB> => {
	try {
		const nucleo = new nucleoModel(data);

		await nucleo.save();

		return nucleo;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.nucleo.notCreated);
	}
};

export const getNucleos_service = async (): Promise<nucleo_from_DB[]> => {
	try {
		const nucleos = await nucleoModel.find();

		return nucleos;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.nucleo.whenObtaining);
	}
};

export const getOneNucleo_service = async (
	_id: string
): Promise<nucleo_from_DB> => {
	try {
		const nucleo = await nucleoModel.findById(_id);

		return nucleo;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.nucleo.whenObtaining);
	}
};

export const updateNucleo_service = async (
	_id: string,
	data: nucleoAttributes
): Promise<nucleo_from_DB> => {
	try {
		const nucleo = await nucleoModel.findOneAndUpdate({ _id }, data);

		return nucleo;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.nucleo.whenObtaining);
	}
};

export const deleteNucleo_service = async (_id: string): Promise<void> => {
	try {
		await nucleoModel.deleteOne({ _id });
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.nucleo.whenObtaining);
	}
};
