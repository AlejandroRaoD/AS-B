import { NotFoundException } from "../../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../../config/messages";
import { CreateFiamDto } from "./dto/create-fiam.dto";
import { QueryFiamDto } from "./dto/query-fiam.dto";
import { UpdateFiamDto } from "./dto/update-fiam.dto";
import fiamModel, { fiam_from_DB } from "./models/fiam.model";

export const createFiam_service = async (
	data: CreateFiamDto
): Promise<fiam_from_DB> => {
	const fiam = new fiamModel(data);

	await fiam.save();

	return fiam;
};

export const getFiams_service = async (
	queryFiamDto: QueryFiamDto
): Promise<fiam_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = queryFiamDto;

	const fiams = await fiamModel.find(query).sort("catedraId");

	return fiams;
};

export const getOneFiam_service = async (id: string): Promise<fiam_from_DB> => {
	const fiam = await fiamModel.findById(id);

	if (!fiam) throw new NotFoundException(ErrorMsg.notFound(moduleItems.fiam));

	return fiam;
};

export const updateFiam_service = async (
	id: string,
	data: UpdateFiamDto
): Promise<fiam_from_DB> => {
	const fiam = await fiamModel.findByIdAndUpdate(id, data, { new: true });

	if (!fiam) throw new NotFoundException(ErrorMsg.notFound(moduleItems.fiam));

	return fiam;
};

export const deleteFiam_service = async (id: string) => {
	return await fiamModel.findByIdAndDelete(id);
};
