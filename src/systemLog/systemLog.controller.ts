import { Request, Response } from "express";
import { getSystemLogs_service } from "./systemLog.service";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { matchedData } from "express-validator";
import { QuerySystemLogDto } from "./dto/query-system-log.dto";

// export const createSystemLog_controller = async (
// 	req: Request,
// 	res: Response
// ) => {
// 	const data = matchedData(req) as CreateSystemLogDto;

// 	try {
// 		const systemLog = await createSystemLog_service(data);

// 		res.status(201).json({ data: systemLog });
// 	} catch (error) {
// 		errorHandlerHelper(error, res);
// 	}
// };

export const getSystemLogs_controller = async (req: Request, res: Response) => {
	const data = matchedData(req) as QuerySystemLogDto;

	try {
		const systemLogs = await getSystemLogs_service(data);

		res.status(200).json({ data: systemLogs });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

// export const getOneSystemLog_controller = async (
// 	req: Request,
// 	res: Response
// ) => {
// 	const { id } = req.params;

// 	try {
// 		const systemLog = await getOneSystemLog_service(id);

// 		res.status(200).json({ data: systemLog });
// 	} catch (error) {
// 		errorHandlerHelper(error, res);
// 	}
// };

// export const updateSystemLog_controller = async (
// 	req: Request,
// 	res: Response
// ) => {
// 	try {
// 		const { id } = req.params;

// 		const data = matchedData(req) as UpdateSystemLogDto;

// 		const systemLog = await updateSystemLog_service(id, data);

// 		res.json({ data: systemLog });
// 	} catch (error) {
// 		errorHandlerHelper(error, res);
// 	}
// };

// export const deleteSystemLog_controller = async (
// 	req: Request,
// 	res: Response
// ) => {
// 	try {
// 		const { id } = req.params;

// 		await deleteSystemLog_service(id);

// 		res.json({ data: "ok" });
// 	} catch (error) {
// 		errorHandlerHelper(error, res);
// 	}
// };
