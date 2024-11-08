import {
	BadRequestException,
	NotFoundException,
} from "../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../config/messages";
import { CreateProgramaDto } from "./dto/create-programa.dto";
import { QueryProgramaDto } from "./dto/query-programa.dto";
import { UpdateProgramaDto } from "./dto/update-programa.dto";
import programaModel, {
	programaAttributes,
	programaStatus,
	programa_from_DB,
} from "./models/programa.model";

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

	const programas = await programaModel
		.find(query)
		.skip(skip)
		.limit(limit)
		.sort("name");

	return programas;
};

export const getOnePrograma_service = async (
	id: string
): Promise<programa_from_DB> => {
	const programa = await programaModel.findById(id);

	if (programa)
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

	if (programa)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.programa));

	return programa;
};

export const deletePrograma_service = async (
	id: string
): Promise<programa_from_DB> => {
	// todo: ver si tiene catedras
	// const hasSedes = await getSedes_service({ nucleoId: id, skip: 0, limit: 1 });

	// if (hasSedes.length)
	// 	throw new BadRequestException(ErrorMsg.hasDependencies(moduleItems.nucleo));

	const programa = await programaModel.findOneAndUpdate(
		{ _id: id },
		{ status: programaStatus.delete },
		{ new: true }
	);

	if (!programa)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.programa));

	return programa;
};
