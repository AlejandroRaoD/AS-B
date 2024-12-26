import { NotFoundException } from "../../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../../config/messages";
import { CreateCatedraDto } from "./dto/create-catedra.dto";
import { QueryCatedraDto } from "./dto/query-catedra.dto";
import { UpdateCatedraDto } from "./dto/update-catedra.dto";
import catedraModel, {
	catedra_from_DB,
} from "./models/catedra.model";

export const createCatedra_service = async (
	createCatedraDto: CreateCatedraDto
): Promise<catedra_from_DB> => {
	const catedra = new catedraModel(createCatedraDto);

	await catedra.save();

	return catedra;
};

export const getCatedras_service = async (
	queryCatedraDto: QueryCatedraDto
): Promise<catedra_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = queryCatedraDto;

	const catedras = await catedraModel
		.find(query)
		// .skip(skip)
		// .limit(limit)
		.sort("name");

	return catedras;
};

export const getOneCatedra_service = async (
	id: string
): Promise<catedra_from_DB> => {
	const catedra = await catedraModel.findById(id);

	if (!catedra)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.catedra));

	return catedra;
};

export const updateCatedra_service = async (
	id: string,
	updateCatedraDto: UpdateCatedraDto
): Promise<catedra_from_DB> => {
	const catedra = await catedraModel.findOneAndUpdate(
		{ _id: id },
		updateCatedraDto,
		{ new: true }
	);

	if (!catedra)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.catedra));

	return catedra;
};

export const deleteCatedra_service = async (id: string): Promise<void> => {
	await catedraModel.deleteOne({ _id: id });
};
