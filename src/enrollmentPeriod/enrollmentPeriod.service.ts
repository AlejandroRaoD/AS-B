import { ErrorsMessages } from "../config/messages";
import enrollmentPeriodModel, {
	enrollmentPeriodAttributes,
	enrollmentPeriod_from_DB,
} from "./models/enrollmentPeriod.model";

export const createEnrollmentPeriod_service = async (
	data: enrollmentPeriodAttributes
): Promise<enrollmentPeriod_from_DB> => {
	try {
		const enrollmentPeriod = new enrollmentPeriodModel(data);

		await enrollmentPeriod.save();

		return enrollmentPeriod;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.enrollmentPeriod.notCreated);
	}
};

export const getEnrollmentPeriods_service = async (): Promise<enrollmentPeriod_from_DB[]> => {
	try {
		const enrollmentPeriods = await enrollmentPeriodModel.find();

		return enrollmentPeriods;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.enrollmentPeriod.whenObtaining);
	}
};

export const getOneEnrollmentPeriod_service = async (
	_id: string
): Promise<enrollmentPeriod_from_DB> => {
	try {
		const enrollmentPeriod = await enrollmentPeriodModel.findById(_id);

		return enrollmentPeriod;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.enrollmentPeriod.whenObtaining);
	}
};

export const updateEnrollmentPeriod_service = async (
	_id: string,
	data: enrollmentPeriodAttributes
): Promise<enrollmentPeriod_from_DB> => {
	try {
		await enrollmentPeriodModel.updateOne({ _id }, data);

		const enrollmentPeriod = enrollmentPeriodModel.findById(_id);

		return enrollmentPeriod;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.enrollmentPeriod.whenObtaining);
	}
};

export const deleteEnrollmentPeriod_service = async (_id: string): Promise<void> => {
	try {
		const result = await enrollmentPeriodModel.deleteOne({ _id });

		console.log(result);

		if (!result.deletedCount) throw new Error(ErrorsMessages.enrollmentPeriod.notFound);
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.enrollmentPeriod.whenObtaining);
	}
};
