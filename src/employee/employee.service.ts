import { NotFoundException } from "../common/classes/ErrorWithHttpStatus";
import { ErrorMsg, moduleItems } from "../config/messages";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { QueryEmployeeDto } from "./dto/query-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

import employeeModel, { employee_from_DB } from "./models/employee.model";

export const createEmployee_service = async (
	data: CreateEmployeeDto
): Promise<employee_from_DB> => {
	const employee = new employeeModel(data);

	await employee.save();

	return employee;
};

export const getEmployees_service = async (
	queryEmployeeDto: QueryEmployeeDto
): Promise<employee_from_DB[]> => {
	const { skip = 0, limit = 10, ...query } = queryEmployeeDto;

	const formatQuery = { ...query, name: new RegExp(query.name, "i") };

	const employees = await employeeModel.find(formatQuery).sort("name");

	return employees;
};

export const getOneEmployee_service = async (
	id: string
): Promise<employee_from_DB> => {
	const employee = await employeeModel.findById(id);

	if (!employee)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.employee));

	return employee;
};

export const updateEmployee_service = async (
	id: string,
	data: UpdateEmployeeDto
): Promise<employee_from_DB> => {
	const employee = await employeeModel.findByIdAndUpdate(id, data, {
		new: true,
	});

	if (!employee)
		throw new NotFoundException(ErrorMsg.notFound(moduleItems.employee));

	return employee;
};

export const deleteEmployee_service = async (_id: string) => {
	return await employeeModel.findByIdAndDelete(_id);
};
