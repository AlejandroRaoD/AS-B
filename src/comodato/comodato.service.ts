import { NotFoundException } from "../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../config/messages";
import { CreateComodatoDto } from "./dto/create-comodato.dto";
import { QueryComodatoDto } from "./dto/query-comodato.dto";
import { UpdateComodatoDto } from "./dto/update-comodato.dto";
import comodatoModel, { comodato_from_DB } from "./models/comodato.model";

export const createComodato_service = async (
	data: CreateComodatoDto
): Promise<comodato_from_DB> => {
	const comodato = new comodatoModel(data);

	await comodato.save();

	return comodato;
};

export const getComodatos_service = async (
	queryComodatoDto: QueryComodatoDto
): Promise<comodato_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = queryComodatoDto;

	const comodatos = await comodatoModel.find(query);

	return comodatos;
};

export const getOneComodato_service = async (
	id: string
): Promise<comodato_from_DB> => {
	const comodato = await comodatoModel.findById(id);

	if (!comodato)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.comodato));

	return comodato;
};

export const updateComodato_service = async (
	id: string,
	data: UpdateComodatoDto
): Promise<comodato_from_DB> => {
	const comodato = await comodatoModel.findByIdAndUpdate(id, data, {
		new: true,
	});

	if (!comodato)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.comodato));

	return comodato;
};

export const deleteComodato_service = async (_id: string): Promise<void> => {
	const result = await comodatoModel.deleteOne({ _id });

	if (!result.deletedCount)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.comodato));
};
