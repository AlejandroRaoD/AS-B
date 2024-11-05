import { ErrorsMessages } from "../config/messages";
import comodatoModel, {
	ComodatoAttributes,
	comodato_from_DB,
} from "./models/comodato.model";

export const createComodato_service = async (
	data: ComodatoAttributes
): Promise<comodato_from_DB> => {
	try {
		const comodato = new comodatoModel(data);

		await comodato.save();

		return comodato;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.comodato.notCreated);
	}
};

export const getComodatos_service = async (): Promise<comodato_from_DB[]> => {
	try {
		const comodatos = await comodatoModel.find();

		return comodatos;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.comodato.whenObtaining);
	}
};

export const getOneComodato_service = async (
	_id: string
): Promise<comodato_from_DB> => {
	try {
		const comodato = await comodatoModel.findById(_id);

		return comodato;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.comodato.whenObtaining);
	}
};

export const updateComodato_service = async (
	_id: string,
	data: ComodatoAttributes
): Promise<comodato_from_DB> => {
	try {
		await comodatoModel.updateOne({ _id }, data);

		const comodato = comodatoModel.findById(_id);

		return comodato;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.comodato.whenObtaining);
	}
};

export const deleteComodato_service = async (_id: string): Promise<void> => {
	try {
		const result = await comodatoModel.deleteOne({ _id });

		console.log(result);

		if (!result.deletedCount) throw new Error(ErrorsMessages.comodato.notFound);
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.comodato.whenObtaining);
	}
};
