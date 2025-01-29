import { Request, Response } from "express";
import { matchedData } from "express-validator";
import {
	createEnrollmentPeriod_service,
	deleteEnrollmentPeriod_service,
	getEnrollmentPeriods_service,
	getOneEnrollmentPeriod_service,
	updateEnrollmentPeriod_service,
} from "./enrollmentPeriod.service";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { CreateEnrollmentPeriodDto } from "./dtos/create-enrollment-perid.dto";
import { QueryEnrollmentPeriodDto } from "./dtos/query-enrollment-perid.dto";
import { UpdateEnrollmentPeriodDto } from "./dtos/update-enrollment-perid.dto";
import { createSystemLog_service } from "../systemLog/systemLog.service";
import { SystemAction } from "../systemLog/models/systemLog.model";
import { moduleItems } from "../config/messages";

export const createEnrollmentPeriod_controller = async (
	req: Request,
	res: Response
) => {
	const data = matchedData(req) as CreateEnrollmentPeriodDto;

	try {
		const enrollmentPeriod = await createEnrollmentPeriod_service(data);

		await createSystemLog_service({
			systemAction: SystemAction.create,
			moduleItem: moduleItems.enrollmentPeriod,
			itemId: enrollmentPeriod._id.toString(),
			text: enrollmentPeriod.year + "-" + enrollmentPeriod.step,
			userId: req.user._id,
			userEmail: req.user.email,
		});

		res.status(201).json({ data: enrollmentPeriod });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getEnrollmentPeriods_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const query = matchedData(req) as QueryEnrollmentPeriodDto;

		const enrollmentPeriods = await getEnrollmentPeriods_service(query);

		res.status(200).json({ data: enrollmentPeriods });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneEnrollmentPeriod_controller = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	try {
		const enrollmentPeriod = await getOneEnrollmentPeriod_service(id);

		res.status(200).json({ data: enrollmentPeriod });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateEnrollmentPeriod_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		const data = matchedData(req) as UpdateEnrollmentPeriodDto;

		const enrollmentPeriod = await updateEnrollmentPeriod_service(id, data);
		await createSystemLog_service({
			systemAction: SystemAction.update,
			moduleItem: moduleItems.enrollmentPeriod,
			itemId: enrollmentPeriod._id.toString(),
			text: enrollmentPeriod.year + "-" + enrollmentPeriod.step,
			userId: req.user._id,
			userEmail: req.user.email,
		});
		res.json({ data: enrollmentPeriod });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteEnrollmentPeriod_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		const enrollmentPeriod = await deleteEnrollmentPeriod_service(id);

		await createSystemLog_service({
			systemAction: SystemAction.delete,
			moduleItem: moduleItems.enrollmentPeriod,
			itemId: enrollmentPeriod._id.toString(),
			text: enrollmentPeriod.year + "-" + enrollmentPeriod.step,
			userId: req.user._id,
			userEmail: req.user.email,
		});
		res.json({ ok: true });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
