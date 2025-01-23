import { Request, Response } from "express";
import {
	createStudentEnrollment_service,
	deleteStudentEnrollment_service,
	getStudentEnrollments_service,
	getOneStudentEnrollment_service,
	updateStudentEnrollment_service,
} from "./studentEnrollment.service";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { CreateStudentEnrollmentDto } from "./dto/create-student-enrollment.dto";
import { matchedData } from "express-validator";
import { QueryStudentEnrollmentDto } from "./dto/query-student-enrollment.dto";
import { UpdateStudentEnrollmentDto } from "./dto/update-student-enrollment.dto";

export const createStudentEnrollment_controller = async (
	req: Request,
	res: Response
) => {
	const data = matchedData(req) as CreateStudentEnrollmentDto;

	try {
		const studentEnrollment = await createStudentEnrollment_service(data);

		res.status(201).json({ data: studentEnrollment });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getStudentEnrollments_controller = async (
	req: Request,
	res: Response
) => {
	const data = matchedData(req) as QueryStudentEnrollmentDto;

	try {
		const studentEnrollments = await getStudentEnrollments_service(data);

		res.status(200).json({ data: studentEnrollments });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneStudentEnrollment_controller = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	try {
		const studentEnrollment = await getOneStudentEnrollment_service(id);

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
		const { id } = req.params;

		const data = matchedData(req) as UpdateStudentEnrollmentDto;

		const studentEnrollment = await updateStudentEnrollment_service(id, data);

		res.json({ data: studentEnrollment });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteStudentEnrollment_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;

		await deleteStudentEnrollment_service(id);

		res.json({ data: "ok" });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
