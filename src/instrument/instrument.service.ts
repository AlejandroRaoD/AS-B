import { ErrorMsg } from "../config/messages";
import instrumentModel, {
	instrumentAttributes,
	instrument_from_DB,
} from "./models/instrument.model";

export const createInstrument_service = async (
	data: instrumentAttributes
): Promise<instrument_from_DB> => {
	try {
		const instrument = new instrumentModel(data);

		await instrument.save();

		return instrument;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.instrument.notCreated);
	}
};

export const getInstruments_service = async (): Promise<instrument_from_DB[]> => {
	try {
		const instruments = await instrumentModel.find();

		return instruments;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.instrument.whenObtaining);
	}
};

export const getOneInstrument_service = async (
	_id: string
): Promise<instrument_from_DB> => {
	try {
		const instrument = await instrumentModel.findById(_id);

		return instrument;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.instrument.whenObtaining);
	}
};

export const updateInstrument_service = async (
	_id: string,
	data: instrumentAttributes
): Promise<instrument_from_DB> => {
	try {
		await instrumentModel.updateOne({ _id }, data);

		const instrument = instrumentModel.findById(_id);

		return instrument;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.instrument.whenObtaining);
	}
};

export const deleteInstrument_service = async (_id: string): Promise<void> => {
	try {
		const result = await instrumentModel.deleteOne({ _id });

		console.log(result);

		if (!result.deletedCount) throw new Error(ErrorMsg.instrument.notFound);
	} catch (error) {
		console.log(error);
		throw new Error(ErrorMsg.instrument.whenObtaining);
	}
};
