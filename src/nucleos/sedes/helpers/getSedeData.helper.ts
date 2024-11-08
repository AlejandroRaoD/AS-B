import { sedeAttributes } from "../models/sede.model";

const getSedeDataOfRequest = (
	rawBody: any
): Omit<sedeAttributes, "_id" | "status"> => {
	const { name, address, phone_number, nucleoId } = rawBody;

	return { name, address, phone_number, nucleoId };
};

export default getSedeDataOfRequest;
