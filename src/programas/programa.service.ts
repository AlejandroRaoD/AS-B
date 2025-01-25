import {
	BadRequestException,
	NotFoundException,
} from "../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../config/messages";
import { getCatedras_service } from "./catedras/catedra.service";
import { CreateProgramaDto } from "./dto/create-programa.dto";
import { QueryProgramaDto } from "./dto/query-programa.dto";
import { UpdateProgramaDto } from "./dto/update-programa.dto";
import programaModel, { programa_from_DB } from "./models/programa.model";

export const createPrograma_service = async (
	data: CreateProgramaDto
): Promise<programa_from_DB> => {
	const programa = new programaModel(data);

	await programa.save();

	return programa;
};

export const getProgramas_service = async (
	queryProgramaDto: QueryProgramaDto
): Promise<programa_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = queryProgramaDto;

	const formatedQuery = {
		...query,
		name: query.name ? new RegExp(`${query.name}`, "i") : new RegExp(``, "i"),
		// phone_number:[que]
	};

	const programas = await programaModel
		.find(formatedQuery)
		// .skip(skip)
		// .limit(limit)
		.sort("name");

	return programas;
};

export const getOnePrograma_service = async (
	id: string
): Promise<programa_from_DB> => {
	const programa = await programaModel.findById(id);

	if (!programa)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.programa));

	return programa;
};

export const updatePrograma_service = async (
	id: string,
	updateProgramaDto: UpdateProgramaDto
): Promise<programa_from_DB> => {
	const programa = await programaModel.findOneAndUpdate(
		{ _id: id },
		updateProgramaDto,
		{ new: true }
	);

	if (!programa)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.programa));

	return programa;
};

export const deletePrograma_service = async (id: string): Promise<void> => {
	const hasCatedras = await getCatedras_service({
		programaId: id,
		skip: 0,
		limit: 1,
	});

	if (hasCatedras.length)
		throw new BadRequestException(
			ErrorMsg.hasDependencies(moduleItems.programa)
		);

	await programaModel.deleteOne({ _id: id });
};
