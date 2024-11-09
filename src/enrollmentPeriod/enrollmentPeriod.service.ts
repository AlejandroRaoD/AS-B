import {
	BadRequestException,
	NotFoundException,
} from "../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../config/messages";
import { CreateEnrollmentPeriodDto } from "./dtos/create-enrollment-perid.dto";
import { QueryEnrollmentPeriodDto } from "./dtos/query-enrollment-perid.dto";
import { UpdateEnrollmentPeriodDto } from "./dtos/update-enrollment-perid.dto";
import enrollmentPeriodModel, {
	enrollmentPeriodAttributes,
	enrollmentPeriod_from_DB,
} from "./models/enrollmentPeriod.model";

export const createEnrollmentPeriod_service = async (
	createEnrollmentPeriodDto: CreateEnrollmentPeriodDto
): Promise<enrollmentPeriod_from_DB> => {
	const old = await enrollmentPeriodModel.findOne(createEnrollmentPeriodDto);

	if (old)
		throw new BadRequestException(
			ErrorMsg.alreadyExist(moduleItems.enrollmentPeriod)
		);

	const enrollmentPeriod = new enrollmentPeriodModel(createEnrollmentPeriodDto);

	await enrollmentPeriod.save();

	return enrollmentPeriod;
};

export const getEnrollmentPeriods_service = async (
	queryEnrollmentPeriodDto: QueryEnrollmentPeriodDto
): Promise<enrollmentPeriod_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = queryEnrollmentPeriodDto;

	const enrollmentPeriods = await enrollmentPeriodModel
		.find(query)
		.skip(skip)
		.limit(limit)
		.sort("year");

	return enrollmentPeriods;
};

export const getOneEnrollmentPeriod_service = async (
	id: string
): Promise<enrollmentPeriod_from_DB> => {
	const enrollmentPeriod = await enrollmentPeriodModel.findById(id);

	if (!enrollmentPeriod)
		throw new NotFoundException(
			ErrorMsg.notFound(moduleItems.enrollmentPeriod)
		);

	return enrollmentPeriod;
};

export const updateEnrollmentPeriod_service = async (
	id: string,
	updateEnrollmentPeriodDto: UpdateEnrollmentPeriodDto
): Promise<enrollmentPeriod_from_DB> => {
	const enrollmentPeriod = enrollmentPeriodModel.findOneAndUpdate(
		{ _id: id },
		updateEnrollmentPeriodDto,
		{ new: true }
	);

	if (!enrollmentPeriod)
		throw new NotFoundException(
			ErrorMsg.notFound(moduleItems.enrollmentPeriod)
		);

	return enrollmentPeriod;
};

export const deleteEnrollmentPeriod_service = async (
	id: string
): Promise<void> => {
	// todo: que no se elimine si ya hay inscripciones

	const result = await enrollmentPeriodModel.deleteOne({ _id: id });

	if (!result.deletedCount)
		throw new NotFoundException(
			ErrorMsg.notFound(moduleItems.enrollmentPeriod)
		);
};
