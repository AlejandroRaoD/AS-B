import { isValidObjectId } from "mongoose";

import { ErrorMsg, moduleItems } from "../config/messages";
import nucleoModel, {
	nucleo_from_DB,
	nucleoAttributes,
	nucleoStatus,
} from "./models/nucleo.model";

import {
	BadRequestException,
	NotFoundException,
} from "../common/classes/ErrorWithHttpStatus";

import { QueryNucleoDto } from "./dto/query-nucleo.dto";
import { getSedes_service } from "./sedes/sede.service";

export const createNucleo_service = async (
	data: Omit<nucleoAttributes, "_id" | "status">
): Promise<nucleo_from_DB> => {
	const { name } = data;

	const exist = await getOneNucleo_service(name);

	if (exist)
		throw new BadRequestException(ErrorMsg.alreadyExist(moduleItems.nucleo));

	const nucleo = new nucleoModel(data);

	await nucleo.save();

	return nucleo;
};

export const getNucleos_service = async (
	queryNucleoDto?: QueryNucleoDto
): Promise<nucleo_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = queryNucleoDto;

	const nucleos = await nucleoModel
		.find(query)
		.skip(skip)
		.limit(limit)
		.sort("name");

	return nucleos;
};

export const getOneNucleo_service = async (
	term: string
): Promise<nucleo_from_DB> => {
	const nucleo = isValidObjectId(term)
		? await nucleoModel.findById(term)
		: await nucleoModel.findOne({ name: term });

	return nucleo;
};

export const updateNucleo_service = async (
	id: string,
	data: Omit<nucleoAttributes, "_id" | "status">
): Promise<nucleo_from_DB> => {
	const { name } = data;

	const exist = await getOneNucleo_service(name);

	if (exist)
		throw new BadRequestException(ErrorMsg.alreadyExist(moduleItems.nucleo));

	const nucleo = await nucleoModel.findOneAndUpdate(
		{ _id: id },
		{ name },
		{ new: true }
	);

	return nucleo;
};

export const deleteNucleo_service = async (
	id: string
): Promise<nucleo_from_DB> => {
	const hasSedes = await getSedes_service({ nucleoId: id, skip: 0, limit: 1 });

	if (hasSedes.length)
		throw new BadRequestException(ErrorMsg.hasDependencies(moduleItems.nucleo));

	const nucleo = await nucleoModel.findOneAndUpdate(
		{ _id: id },
		{ status: nucleoStatus.delete },
		{ new: true }
	);

	if (!nucleo)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.nucleo));

	return nucleo;
};
