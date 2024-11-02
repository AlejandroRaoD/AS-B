import { ErrorsMessages } from "../config/messages";
import programaModel, {
	programaAttributes,
	programa_from_DB,
} from "./models/programa.model";

export const createPrograma_service = async (
	data: programaAttributes
): Promise<programa_from_DB> => {
	try {
		const programa = new programaModel(data);

		await programa.save();

		return programa;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.programa.notCreated);
	}
};

export const getProgramas_service = async (): Promise<programa_from_DB[]> => {
	try {
		const programas = await programaModel.find();

		return programas;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.programa.whenObtaining);
	}
};

export const getOnePrograma_service = async (
	_id: string
): Promise<programa_from_DB> => {
	try {
		const programa = await programaModel.findById(_id);

		return programa;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.programa.whenObtaining);
	}
};

export const updatePrograma_service = async (
	_id: string,
	data: programaAttributes
): Promise<programa_from_DB> => {
	try {
		await programaModel.updateOne({ _id }, data);

		const programa = programaModel.findById(_id);

		return programa;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.programa.whenObtaining);
	}
};

export const deletePrograma_service = async (_id: string): Promise<void> => {
	try {
		const result = await programaModel.deleteOne({ _id });

		console.log(result);

		if (!result.deletedCount) throw new Error(ErrorsMessages.programa.notFound);
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.programa.whenObtaining);
	}
};
