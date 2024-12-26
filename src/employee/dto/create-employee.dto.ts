import { employeeAttributes } from "../models/employee.model";

export interface CreateEmployeeDto
	extends Omit<employeeAttributes, "_id" | "status"> {}
