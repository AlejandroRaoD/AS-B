import { ErrorsMessages } from "../config/messages";
import studentEnrollmentModel, {
	studentEnrollmentAttributes,
	studentEnrollment_from_DB,
} from "./models/studentEnrollment.model";

export const createStudentEnrollment_service = async (
	data: studentEnrollmentAttributes
): Promise<studentEnrollment_from_DB> => {
	try {
		const studentEnrollment = new studentEnrollmentModel(data);

		await studentEnrollment.save();

		return studentEnrollment;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.studentEnrollment.notCreated);
	}
};

export const getStudentEnrollments_service = async (): Promise<studentEnrollment_from_DB[]> => {
	try {
		const studentEnrollments = await studentEnrollmentModel.find();

		return studentEnrollments;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.studentEnrollment.whenObtaining);
	}
};

export const getOneStudentEnrollment_service = async (
	_id: string
): Promise<studentEnrollment_from_DB> => {
	try {
		const studentEnrollment = await studentEnrollmentModel.findById(_id);

		return studentEnrollment;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.studentEnrollment.whenObtaining);
	}
};

export const updateStudentEnrollment_service = async (
	_id: string,
	data: studentEnrollmentAttributes
): Promise<studentEnrollment_from_DB> => {
	try {
		await studentEnrollmentModel.updateOne({ _id }, data);

		const studentEnrollment = studentEnrollmentModel.findById(_id);

		return studentEnrollment;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.studentEnrollment.whenObtaining);
	}
};

export const deleteStudentEnrollment_service = async (_id: string): Promise<void> => {
	try {
		const result = await studentEnrollmentModel.deleteOne({ _id });

		console.log(result);

		if (!result.deletedCount) throw new Error(ErrorsMessages.studentEnrollment.notFound);
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.studentEnrollment.whenObtaining);
	}
};
