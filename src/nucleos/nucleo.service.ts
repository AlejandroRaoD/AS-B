import { ErrorsMessages } from "../config/messages";
import nucleoModel, {
	nucleo_from_DB,
	nucleoAttributes,
} from "./models/nucleo.model";

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
	const { name } = data;

	try {
		const nucleo = await nucleoModel.findById(_id);

		nucleo.name = name;

		return nucleo;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.nucleo.whenObtaining);
	}
};

export const deleteNucleo_service = async (_id: string): Promise<void> => {
	try {
		const result = await nucleoModel.deleteOne({ _id });

		if (!result.deletedCount) throw new Error(ErrorsMessages.nucleo.notFound);
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.nucleo.whenObtaining);
	}
};
