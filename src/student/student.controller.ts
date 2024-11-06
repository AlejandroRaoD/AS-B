import { Request, Response } from "express";
import {
	createStudent_service,
	deleteStudent_service,
	getStudents_service,
	getOneStudent_service,
	updateStudent_service,
} from "./student.service";
import getStudentDataOfRequest from "./helpers/getStudentData.helper";
import { ErrorsMessages } from "../config/messages";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";

export const createStudent_controller = async (req: Request, res: Response) => {
	const data = getStudentDataOfRequest(req.body);

	try {
		const student = await createStudent_service(data);

		res.status(201).json({ data: student });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getStudents_controller = async (_req: Request, res: Response) => {
	// const query = req.query

	try {
		const students = await getStudents_service();

		res.status(200).json({ data: students });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneStudent_controller = async (req: Request, res: Response) => {
	const { id: _id } = req.params;

	try {
		const student = await getOneStudent_service(_id);

		res.status(200).json({ data: student });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateStudent_controller = async (req: Request, res: Response) => {
	try {
		const { id: _id } = req.params;
		const data = getStudentDataOfRequest(req.body);

		const student = await updateStudent_service(_id, data);

		res.json({ data: student });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.student.update });
	}
};

export const deleteStudent_controller = async (req: Request, res: Response) => {
	try {
		const { id: _id } = req.params;

		await deleteStudent_service(_id);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.student.delete });
	}
};
