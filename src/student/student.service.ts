import { NotFoundException } from "../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../config/messages";
import { CreateStudentDto } from "./dto/create-student.dto";
import { QueryStudentDto } from "./dto/query-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import studentModel, {
	StudentStatus,
	student_from_DB,
} from "./models/student.model";

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

	const students = await studentModel
		.find(query)
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
