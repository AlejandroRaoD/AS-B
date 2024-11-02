import { ErrorsMessages } from "../config/messages";
import studentModel, {
	studentAttributes,
	student_from_DB,
} from "./models/student.model";

export const createStudent_service = async (
	data: studentAttributes
): Promise<student_from_DB> => {
	try {
		const student = new studentModel(data);

		await student.save();

		return student;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.student.notCreated);
	}
};

export const getStudents_service = async (): Promise<student_from_DB[]> => {
	try {
		const students = await studentModel.find();

		return students;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.student.whenObtaining);
	}
};

export const getOneStudent_service = async (
	_id: string
): Promise<student_from_DB> => {
	try {
		const student = await studentModel.findById(_id);

		return student;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.student.whenObtaining);
	}
};

export const updateStudent_service = async (
	_id: string,
	data: studentAttributes
): Promise<student_from_DB> => {
	try {
		await studentModel.updateOne({ _id }, data);

		const student = studentModel.findById(_id);

		return student;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.student.whenObtaining);
	}
};

export const deleteStudent_service = async (_id: string): Promise<void> => {
	try {
		const result = await studentModel.deleteOne({ _id });

		console.log(result);

		if (!result.deletedCount) throw new Error(ErrorsMessages.student.notFound);
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.student.whenObtaining);
	}
};
