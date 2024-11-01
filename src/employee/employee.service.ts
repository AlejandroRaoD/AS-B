import { ErrorsMessages } from "../config/messages";
import employeeModel, {
	employeeAttributes,
	employee_from_DB,
} from "./models/employee.model";

export const createEmployee_service = async (
	data: employeeAttributes
): Promise<employee_from_DB> => {
	try {
		const employee = new employeeModel(data);

		await employee.save();

		return employee;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.employee.notCreated);
	}
};

export const getEmployees_service = async (): Promise<employee_from_DB[]> => {
	try {
		const employees = await employeeModel.find();

		return employees;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.employee.whenObtaining);
	}
};

export const getOneEmployee_service = async (
	_id: string
): Promise<employee_from_DB> => {
	try {
		const employee = await employeeModel.findById(_id);

		return employee;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.employee.whenObtaining);
	}
};

export const updateEmployee_service = async (
	_id: string,
	data: employeeAttributes
): Promise<employee_from_DB> => {
	try {
		await employeeModel.updateOne({ _id }, data);

		const employee = employeeModel.findById(_id);

		return employee;
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.employee.whenObtaining);
	}
};

export const deleteEmployee_service = async (_id: string): Promise<void> => {
	try {
		const result = await employeeModel.deleteOne({ _id });

		console.log(result);

		if (!result.deletedCount) throw new Error(ErrorsMessages.employee.notFound);
	} catch (error) {
		console.log(error);
		throw new Error(ErrorsMessages.employee.whenObtaining);
	}
};
