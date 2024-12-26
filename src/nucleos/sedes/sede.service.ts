import { NotFoundException } from "../../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../../config/messages";
import { QuerySedeDto } from "./dto/query-sede.dto";
import sedeModel, { sedeAttributes, sede_from_DB } from "./models/sede.model";

export const createSede_service = async (
	data: Omit<sedeAttributes, "_id" | "status">
): Promise<sede_from_DB> => {
	const sede = new sedeModel(data);

	await sede.save();

	return sede;
};

export const getSedes_service = async (
	querySedeDto?: QuerySedeDto
): Promise<sede_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = querySedeDto;

	const sedes = await sedeModel
		.find(query)
		// .skip(skip)
		// .limit(limit)
		.sort("name");

	return sedes;
};

export const getOneSede_service = async (
	_id: string
): Promise<sede_from_DB> => {
	const sede = await sedeModel.findById(_id);

	if (!sede) throw new NotFoundException(ErrorMsg.notFound(moduleItems.sede));

	return sede;
};

export const updateSede_service = async (
	_id: string,
	data: Omit<sedeAttributes, "_id" | "status" | "nucleoId">
): Promise<sede_from_DB> => {
	const { name, address, phone_number } = data;

	const sede = await sedeModel.findOneAndUpdate(
		{ _id },
		{ name, address, phone_number },
		{ new: true }
	);

	return sede;
};

export const deleteSede_service = async (id: string): Promise<void> => {
	// todo: que no se pueda marcar como eliminado si tiene referencias

	await sedeModel.findOneAndDelete({ _id: id });
};
