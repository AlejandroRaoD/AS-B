import { NotFoundException } from "../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../config/messages";
import { CreateStudentRelationDto } from "./dto/create-student-relation.dto";
import { CreateStudentDto } from "./dto/create-student.dto";
import { QueryStudentRelationDto } from "./dto/query-student-relation.dto";
import { QueryStudentDto } from "./dto/query-student.dto";
import { UpdateStudentRelationDto } from "./dto/update-student-relation.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import studentModel, {
	StudentStatus,
	student_from_DB,
} from "./models/student.model";
import studentRelationModel, {
	studentRelation_from_DB,
} from "./models/studentRelation.model";

export const createStudent_service = async (
	createStudentDto: CreateStudentDto
): Promise<student_from_DB> => {
	const student = new studentModel(createStudentDto);

	await student.save();

	return student;
};

export const getStudents_service = async (
	queryStudentDto: QueryStudentDto
): Promise<student_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = queryStudentDto;

	const formatedQuery = {
		...query,
		name: query.name ? new RegExp(`${query.name}`, "i") : new RegExp(``, "i"),
		// phone_number:[que]
	};

	const students = await studentModel
		.find(formatedQuery)
		// .skip(skip)
		// .limit(limit)
		.sort("name");

	return students;
};

export const getOneStudent_service = async (
	id: string
): Promise<student_from_DB> => {
	const student = await studentModel.findById(id);

	if (!student)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.student));

	return student;
};

export const updateStudent_service = async (
	id: string,
	updateStudentDto: UpdateStudentDto
): Promise<student_from_DB> => {
	const student = studentModel.findOneAndUpdate({ _id: id }, updateStudentDto, {
		new: true,
	});

	if (!student)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.student));

	return student;
};

export const deleteStudent_service = async (
	id: string
): Promise<student_from_DB> => {
	const student = await studentModel.findOneAndUpdate(
		{ _id: id },
		{ status: StudentStatus.delete },
		{ new: true }
	);

	if (!student)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.programa));

	return student;
};

// relacionar con representante

export const createStudentRelation_service = async (
	CreateStudentRelationDto: CreateStudentRelationDto
): Promise<studentRelation_from_DB> => {
	const relation = new studentRelationModel(CreateStudentRelationDto);

	await relation.save();

	return relation;
};

export const getStudentRelations_service = async (
	QueryStudentRelationDto: QueryStudentRelationDto
): Promise<studentRelation_from_DB[]> => {
	const { ...query } = QueryStudentRelationDto;

	const relations = await studentRelationModel.find(query);

	return relations;
};

export const updateStudentRelation_service = async (
	id: string,
	UpdateStudentRelationDto: UpdateStudentRelationDto
): Promise<studentRelation_from_DB> => {
	const relation = studentRelationModel.findOneAndUpdate(
		{ _id: id },
		UpdateStudentRelationDto,
		{
			new: true,
		}
	);

	if (!relation)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.student));

	return relation;
};

export const deleteStudentRelation_service = async (
	id: string
): Promise<void> => {
	await studentRelationModel.deleteOne({ _id: id });
};
