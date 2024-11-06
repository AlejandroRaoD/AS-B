import { isValidObjectId } from "mongoose";
import { ErrorsMessages } from "../config/messages";
import nucleoModel, {
	nucleo_from_DB,
	nucleoAttributes,
} from "./models/nucleo.model";
import { ErrorWithHttpStatus } from "../common/classes/ErrorWithHttpStatus";

// ****************************************************************************
// 										             creacion
// ****************************************************************************

export const createNucleo_service = async (
	data: nucleoAttributes
): Promise<nucleo_from_DB> => {
	const { name } = data;

	const exist = await getOneNucleo_service(name);
	if (exist)
		throw new ErrorWithHttpStatus(400, ErrorsMessages.nucleo.alreadyExist);

	const nucleo = new nucleoModel(data);

	await nucleo.save();

	return nucleo;
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
	term: string
): Promise<nucleo_from_DB> => {
	try {
		const nucleo = isValidObjectId(term)
			? await nucleoModel.findById(term)
			: await nucleoModel.findOne({ name: term });

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

	const exist = await getOneNucleo_service(name);

	if (exist)
		throw new ErrorWithHttpStatus(403, ErrorsMessages.nucleo.alreadyExist);

	const nucleo = await nucleoModel.findById(_id);

	nucleo.name = name;

	await nucleo.save();

	return nucleo;
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
