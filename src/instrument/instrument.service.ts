import { NotFoundException } from "../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../config/messages";
import { CreateInstrumentDto } from "./dto/create-instrument.dto";
import { QueryInstrumentDto } from "./dto/query-instrument.dto";
import { UpdateInstrumentDto } from "./dto/update-instrument.dto";
import instrumentModel, { instrument_from_DB } from "./models/instrument.model";

export const createInstrument_service = async (
	createInstrumentDto: CreateInstrumentDto
): Promise<instrument_from_DB> => {
	const instrument = new instrumentModel(createInstrumentDto);

	await instrument.save();

	return instrument;
};

export const getInstruments_service = async (
	queryInstrumentDto: QueryInstrumentDto
): Promise<instrument_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = queryInstrumentDto;

	const formatedQuery = {
		...query,
		name: query.name ? new RegExp(`${query.name}`, "i") : new RegExp(``, "i"),
		// phone_number:[que]
	};

	const instruments = await instrumentModel
		.find(formatedQuery)
		// .skip(skip)
		// .limit(limit)
		.sort("name");

	return instruments;
};

export const getOneInstrument_service = async (
	id: string
): Promise<instrument_from_DB> => {
	const instrument = await instrumentModel.findById(id);

	if (!instrument)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.instrument));

	return instrument;
};

export const updateInstrument_service = async (
	id: string,
	updateInstrumentDto: UpdateInstrumentDto
): Promise<instrument_from_DB> => {
	const instrument = await instrumentModel.findByIdAndUpdate(
		id,
		updateInstrumentDto,
		{ new: true }
	);

	if (!instrument)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.instrument));

	return instrument;
};

export const deleteInstrument_service = async (_id: string) => {
	return await instrumentModel.findByIdAndDelete(_id);
};
