import { isValidObjectId } from "mongoose";
import { ErrorsMessages, moduleItems } from "../config/messages";
import nucleoModel, {
	nucleo_from_DB,
	nucleoAttributes,
	nucleoStatus,
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
		throw new ErrorWithHttpStatus(
			400,
			ErrorsMessages.alreadyExist(moduleItems.nucleo)
		);

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
	id: string,
	data: nucleoAttributes
): Promise<nucleo_from_DB> => {
	const { name } = data;

	const exist = await getOneNucleo_service(name);

	if (exist)
		throw new ErrorWithHttpStatus(
			400,
			ErrorsMessages.alreadyExist(moduleItems.nucleo)
		);

	const nucleo = await nucleoModel.findById(id);

	nucleo.name = name;

	await nucleo.save();

	return nucleo;
};

export const deleteNucleo_service = async (
	_id: string
): Promise<nucleo_from_DB> => {
	const nucleo = await getOneNucleo_service(_id);

	if (!nucleo)
		throw new ErrorWithHttpStatus(
			404,
			ErrorsMessages.notFound(moduleItems.nucleo)
		);

	// todo: que no se pueda eliminar si tiene referencias
	nucleo.status = nucleoStatus.delete;

	await nucleo.save();

	return nucleo;
};
