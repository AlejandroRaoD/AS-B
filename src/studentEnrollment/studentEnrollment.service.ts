import { NotFoundException } from "../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../config/messages";
import { CreateStudentEnrollmentDto } from "./dto/create-student-enrollment.dto";
import { QueryStudentEnrollmentDto } from "./dto/query-student-enrollment.dto";
import { UpdateStudentEnrollmentDto } from "./dto/update-student-enrollment.dto";
import studentEnrollmentModel, {
	studentEnrollment_from_DB,
} from "./models/studentEnrollment.model";

export const createStudentEnrollment_service = async (
	data: CreateStudentEnrollmentDto
): Promise<studentEnrollment_from_DB> => {
	const studentEnrollment = new studentEnrollmentModel(data);

	await studentEnrollment.save();

	return studentEnrollment;
};

export const getStudentEnrollments_service = async (
	queryStudentEnrollmentDto: QueryStudentEnrollmentDto
): Promise<studentEnrollment_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = queryStudentEnrollmentDto;

	const enrollments = await studentEnrollmentModel.find(query);

	return enrollments;
};

export const getOneStudentEnrollment_service = async (
	_id: string
): Promise<studentEnrollment_from_DB> => {
	const studentEnrollment = await studentEnrollmentModel.findById(_id);

	if (!studentEnrollment)
		throw new NotFoundException(
			ErrorMsg.notFound(moduleItems.studentEnrollment)
		);

	return studentEnrollment;
};

export const updateStudentEnrollment_service = async (
	_id: string,
	data: UpdateStudentEnrollmentDto
): Promise<studentEnrollment_from_DB> => {
	const studentEnrollment = await studentEnrollmentModel.findOneAndUpdate(
		{ _id },
		data,
		{ new: true }
	);

	if (!studentEnrollment)
		throw new NotFoundException(
			ErrorMsg.notFound(moduleItems.studentEnrollment)
		);

	return studentEnrollment;
};

export const deleteStudentEnrollment_service = async (
	_id: string
): Promise<void> => {
	const result = await studentEnrollmentModel.deleteOne({ _id });

	if (!result.deletedCount)
		throw new NotFoundException(
			ErrorMsg.notFound(moduleItems.studentEnrollment)
		);
};
