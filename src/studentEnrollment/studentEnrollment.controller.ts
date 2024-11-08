import { Request, Response } from "express";
import {
	createStudentEnrollment_service,
	deleteStudentEnrollment_service,
	getStudentEnrollments_service,
	getOneStudentEnrollment_service,
	updateStudentEnrollment_service,
} from "./studentEnrollment.service";
import getStudentEnrollmentDataOfRequest from "./helpers/getStudentEnrollmentData.helper";
import { ErrorMsg } from "../config/messages";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";

export const createStudentEnrollment_controller = async (
	req: Request,
	res: Response
) => {
	const data = getStudentEnrollmentDataOfRequest(req.body);

	try {
		const studentEnrollment = await createStudentEnrollment_service(data);

		res.status(201).json({ data: studentEnrollment });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getStudentEnrollments_controller = async (
	_req: Request,
	res: Response
) => {
	// const query = req.query

	try {
		const studentEnrollments = await getStudentEnrollments_service();

		res.status(200).json({ data: studentEnrollments });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneStudentEnrollment_controller = async (
	req: Request,
	res: Response
) => {
	const { id: _id } = req.params;

	try {
		const studentEnrollment = await getOneStudentEnrollment_service(_id);

		res.status(200).json({ data: studentEnrollment });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateStudentEnrollment_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;
		const data = getStudentEnrollmentDataOfRequest(req.body);

		const studentEnrollment = await updateStudentEnrollment_service(_id, data);

		res.json({ data: studentEnrollment });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorMsg.studentEnrollment.update });
	}
};

export const deleteStudentEnrollment_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;

		await deleteStudentEnrollment_service(_id);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json({ error: true, message: ErrorMsg.studentEnrollment.delete });
	}
};
