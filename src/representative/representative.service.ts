import { ErrorMsg } from "../config/messages";
import representativeModel, {
	representativeAttributes,
	representative_from_DB,
} from "./models/representative.model";

export const createRepresentative_service = async (
	data: representativeAttributes
): Promise<representative_from_DB> => {
	try {
		const representative = new representativeModel(data);

		await representative.save();

		return representative;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.representative.notCreated);
	}
};

export const getRepresentatives_service = async (): Promise<representative_from_DB[]> => {
	try {
		const representatives = await representativeModel.find();

		return representatives;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.representative.whenObtaining);
	}
};

export const getOneRepresentative_service = async (
	_id: string
): Promise<representative_from_DB> => {
	try {
		const representative = await representativeModel.findById(_id);

		return representative;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.representative.whenObtaining);
	}
};

export const updateRepresentative_service = async (
	_id: string,
	data: representativeAttributes
): Promise<representative_from_DB> => {
	try {
		await representativeModel.updateOne({ _id }, data);

		const representative = representativeModel.findById(_id);

		return representative;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.representative.whenObtaining);
	}
};

export const deleteRepresentative_service = async (_id: string): Promise<void> => {
	try {
		const result = await representativeModel.deleteOne({ _id });

		console.log(result);

		if (!result.deletedCount) throw new Error(ErrorMsg.representative.notFound);
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.representative.whenObtaining);
	}
};
