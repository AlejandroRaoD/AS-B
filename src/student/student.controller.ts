import { Request, Response } from "express";
import {
	createStudent_service,
	deleteStudent_service,
	getStudentsRepresentative_service,
	getOneStudent_service,
	updateStudent_service,
	createStudentAndRepresenttive_service,
	updateStudentRepresentative_service,
	getOneStudentRepresentative_service,
	deleteStudentRepresentative_service,
	getStudents_service,
} from "./student.service";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { matchedData } from "express-validator";
import { CreateStudentDto } from "./dto/create-student.dto";
import { QueryStudentDto } from "./dto/query-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { CreateStudentRepresentativeDto } from "./dto/create-student-representative.dto";
import { QueryStudentRepresentativeDto } from "./dto/query-student-representative.dto";
import { UpdateStudentRepresentativeDto } from "./dto/update-student-representative.dto";

export const createStudent_controller = async (req: Request, res: Response) => {
	try {
		const createStudentDto = matchedData(req) as CreateStudentDto;
		const student = await createStudent_service(createStudentDto);

		res.status(201).json({ data: student });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getStudents_controller = async (req: Request, res: Response) => {
	try {
		const query = matchedData(req) as QueryStudentDto;

		const students = await getStudents_service(query);

		res.status(200).json({ data: students });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneStudent_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const student = await getOneStudent_service(id);

		res.status(200).json({ data: student });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateStudent_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updateStudentDto = matchedData(req) as UpdateStudentDto;

		const student = await updateStudent_service(id, updateStudentDto);

		res.json({ data: student });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteStudent_controller = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const student = await deleteStudent_service(id);

		res.json({ data: student });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
// ************************************************************************
// 							relacion entre estudiante y representante
// ************************************************************************

export const createStudentRepresentative_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const createStudentRepresentativeDto = matchedData(
			req
		) as CreateStudentRepresentativeDto;
		const relation = await createStudentAndRepresenttive_service(
			createStudentRepresentativeDto
		);

		res.status(201).json({ data: relation });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getStudentRepresentatives_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const query = matchedData(req) as QueryStudentRepresentativeDto;

		const relations = await getStudentsRepresentative_service(query);

		res.status(200).json({ data: relations });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneStudentRepresentative_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		const relation = await getOneStudentRepresentative_service(id);

		res.status(200).json({ data: relation });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateStudentRepresentative_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		const updateStudentRepresentativeDto = matchedData(
			req
		) as UpdateStudentRepresentativeDto;

		const relation = await updateStudentRepresentative_service(
			id,
			updateStudentRepresentativeDto
		);

		res.json({ data: relation });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteStudentRepresentative_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;

		await deleteStudentRepresentative_service(id);

		res.json({ data: "ok" });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
