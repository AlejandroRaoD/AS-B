import { NotFoundException } from "../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../config/messages";
import { CreateRepresentativeDto } from "./dto/create-representative.dto";
import { QueryRepresentativeDto } from "./dto/query-representative.dto";
import { UpdateRepresentativeDto } from "./dto/update-student.dto";
import representativeModel, {
	representative_from_DB,
} from "./models/representative.model";

export const createRepresentative_service = async (
	data: CreateRepresentativeDto
): Promise<representative_from_DB> => {
	const representative = new representativeModel(data);

	await representative.save();

	return representative;
};

export const getRepresentatives_service = async (
	queryRepresentativeDto: QueryRepresentativeDto
): Promise<representative_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = queryRepresentativeDto;

	const formatQuery = { ...query, name: new RegExp(query.name, "i") };

	const representatives = await representativeModel
		.find(formatQuery)
		.sort("name");

	return representatives;
};

export const getOneRepresentative_service = async (
	_id: string
): Promise<representative_from_DB> => {
	const representative = await representativeModel.findById(_id);

	if (!representative)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.representative));

	return representative;
};

export const updateRepresentative_service = async (
	id: string,
	data: UpdateRepresentativeDto
): Promise<representative_from_DB> => {
	const representative = await representativeModel.findByIdAndUpdate(id, data, {
		new: true,
	});

	if (!representative)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.representative));

	return representative;
};

export const deleteRepresentative_service = async (_id: string) => {
	return await representativeModel.findByIdAndDelete(_id);
};
