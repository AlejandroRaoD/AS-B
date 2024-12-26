import { Request, Response } from "express";
import {
	createStudent_service,
	deleteStudent_service,
	getOneStudent_service,
	updateStudent_service,
	createStudentRelation_service,
	getStudents_service,
	getStudentRelations_service,
	updateStudentRelation_service,
	deleteStudentRelation_service,
} from "./student.service";

import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { matchedData } from "express-validator";
import { CreateStudentDto } from "./dto/create-student.dto";
import { QueryStudentDto } from "./dto/query-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { CreateStudentRelationDto } from "./dto/create-student-relation.dto";
import { QueryStudentRelationDto } from "./dto/query-student-relation.dto";
import { UpdateStudentRelationDto } from "./dto/update-student-relation.dto";

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

export const createStudentRelation_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const createStudentRepresentativeDto = matchedData(
			req
		) as CreateStudentRelationDto;

		const relation = await createStudentRelation_service(
			createStudentRepresentativeDto
		);

		res.status(201).json({ data: relation });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getStudentRelations_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const query = matchedData(req) as QueryStudentRelationDto;

		const relations = await getStudentRelations_service(query);

		res.status(200).json({ data: relations });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateStudentRelation_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;

		const updateStudentRelationDto = matchedData(
			req
		) as UpdateStudentRelationDto;

		const relation = await updateStudentRelation_service(
			id,
			updateStudentRelationDto
		);

		res.json({ data: relation });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteStudentRelation_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;

		await deleteStudentRelation_service(id);

		res.json({ data: "ok" });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
