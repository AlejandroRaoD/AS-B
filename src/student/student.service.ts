import { NotFoundException } from "../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../config/messages";
import { CreateStudentRepresentativeDto } from "./dto/create-student-representative.dto";
import { CreateStudentDto } from "./dto/create-student.dto";
import { QueryStudentRepresentativeDto } from "./dto/query-student-representative.dto";
import { QueryStudentDto } from "./dto/query-student.dto";
import { UpdateStudentRepresentativeDto } from "./dto/update-student-representative.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import studentModel, {
	StudentStatus,
	student_from_DB,
} from "./models/student.model";
import studentRepresentativeModel, {
	studentRepresentative_from_DB,
} from "./models/studentRepresentative.model";

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
		name: query.name ? new RegExp(`${query.name }`, "i") : new RegExp(``, "i"),
		// phone_number:[que]
	};

	const students = await studentModel
		.find(formatedQuery)
		.skip(skip)
		.limit(limit)
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

export const createStudentAndRepresenttive_service = async (
	createStudentRepresentativeDto: CreateStudentRepresentativeDto
): Promise<studentRepresentative_from_DB> => {
	const relation = new studentRepresentativeModel(
		createStudentRepresentativeDto
	);

	await relation.save();

	return relation;
};

export const getStudentsRepresentative_service = async (
	queryStudentRepresentativeDto: QueryStudentRepresentativeDto
): Promise<studentRepresentative_from_DB[]> => {
	const { ...query } = queryStudentRepresentativeDto;

	const relations = await studentRepresentativeModel
		.find(query)
		// .skip(skip)
		// .limit(limit)
		.sort("name");

	return relations;
};

export const getOneStudentRepresentative_service = async (
	id: string
): Promise<studentRepresentative_from_DB> => {
	const relation = await studentRepresentativeModel.findById(id);

	if (!relation)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.student));

	return relation;
};

export const updateStudentRepresentative_service = async (
	id: string,
	updateStudentRepresentativeDto: UpdateStudentRepresentativeDto
): Promise<studentRepresentative_from_DB> => {
	const relation = studentRepresentativeModel.findOneAndUpdate(
		{ _id: id },
		updateStudentRepresentativeDto,
		{
			new: true,
		}
	);

	if (!relation)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.student));

	return relation;
};

export const deleteStudentRepresentative_service = async (
	id: string
): Promise<void> => {
	await studentRepresentativeModel.deleteOne({ _id: id });
};
