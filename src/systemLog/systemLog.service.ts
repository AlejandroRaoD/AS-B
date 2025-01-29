import { adminUserObject } from "../config";
import { CreateSystemLogDto } from "./dto/create-system-log.dto";
import { QuerySystemLogDto } from "./dto/query-system-log.dto";
import systemLogModel, { systemLog_from_DB } from "./models/systemLog.model";

export const createSystemLog_service = async (
	data: CreateSystemLogDto
): Promise<systemLog_from_DB> => {
	const { userId, userEmail } = data;

	const systemLog = new systemLogModel({
		...data,
		userId: userId != adminUserObject._id ? userId : null,
		userEmail: userEmail != adminUserObject.email ? userEmail : null,
	});

	await systemLog.save();

	return systemLog;
};

export const getSystemLogs_service = async (
	querySystemLogDto: QuerySystemLogDto
): Promise<systemLog_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = querySystemLogDto;

	const enrollments = await systemLogModel.find(query);

	return enrollments;
};

// export const deleteSystemLog_service = async (
// 	_id: string
// ): Promise<void> => {
// 	const result = await systemLogModel.deleteOne({ _id });

// 	if (!result.deletedCount)
// 		throw new NotFoundException(
// 			ErrorMsg.notFound(moduleItems.systemLog)
// 		);
// };
