import { Request, Response } from "express";
import {
	createEnrollmentPeriod_service,
	deleteEnrollmentPeriod_service,
	getEnrollmentPeriods_service,
	getOneEnrollmentPeriod_service,
	updateEnrollmentPeriod_service,
} from "./enrollmentPeriod.service";
import getEnrollmentPeriodDataOfRequest from "./helpers/getEnrollmentPeriodData.helper";
import { ErrorsMessages } from "../config/messages";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";

export const createEnrollmentPeriod_controller = async (
	req: Request,
	res: Response
) => {
	const data = getEnrollmentPeriodDataOfRequest(req.body);

	try {
		const enrollmentPeriod = await createEnrollmentPeriod_service(data);

		res.status(201).json({ data: enrollmentPeriod });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getEnrollmentPeriods_controller = async (
	_req: Request,
	res: Response
) => {
	// const query = req.query

	try {
		const enrollmentPeriods = await getEnrollmentPeriods_service();

		res.status(200).json({ data: enrollmentPeriods });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneEnrollmentPeriod_controller = async (
	req: Request,
	res: Response
) => {
	const { id: _id } = req.params;

	try {
		const enrollmentPeriod = await getOneEnrollmentPeriod_service(_id);

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
		const { id: _id } = req.params;
		const data = getEnrollmentPeriodDataOfRequest(req.body);

		const enrollmentPeriod = await updateEnrollmentPeriod_service(_id, data);

		res.json({ data: enrollmentPeriod });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.enrollmentPeriod.update });
	}
};

export const deleteEnrollmentPeriod_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;

		await deleteEnrollmentPeriod_service(_id);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.enrollmentPeriod.delete });
	}
};
