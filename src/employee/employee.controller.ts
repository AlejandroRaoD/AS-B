import { Request, Response } from "express";
import {
	createEmployee_service,
	deleteEmployee_service,
	getEmployees_service,
	getOneEmployee_service,
	updateEmployee_service,
} from "./employee.service";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { matchedData } from "express-validator";
import { QueryEmployeeDto } from "./dto/query-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { createSystemLog_service } from "../systemLog/systemLog.service";
import { SystemAction } from "../systemLog/models/systemLog.model";
import { moduleItems } from "../config/messages";

export const createEmployee_controller = async (
	req: Request,
	res: Response
) => {
	const data = matchedData(req) as CreateEmployeeDto;

	try {
		const employee = await createEmployee_service(data);

		await createSystemLog_service({
			systemAction: SystemAction.create,
			moduleItem: moduleItems.employee,
			itemId: employee._id.toString(),
			text: employee.name,
			userId: req.user._id,
			userEmail: req.user.email,
		});

		res.status(201).json({ data: employee });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getEmployees_controller = async (req: Request, res: Response) => {
	const query = matchedData(req) as QueryEmployeeDto;

	try {
		const employees = await getEmployees_service(query);

		res.status(200).json({ data: employees });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneEmployee_controller = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	try {
		const employee = await getOneEmployee_service(id);

		res.status(200).json({ data: employee });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const updateEmployee_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;
		const data = matchedData(req) as UpdateEmployeeDto;

		const employee = await updateEmployee_service(_id, data);

		await createSystemLog_service({
			systemAction: SystemAction.update,
			moduleItem: moduleItems.employee,
			itemId: employee._id.toString(),
			text: employee.name,
			userId: req.user._id,
			userEmail: req.user.email,
		});

		res.json({ data: employee });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const deleteEmployee_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;

		const employee = await deleteEmployee_service(id);

		await createSystemLog_service({
			systemAction: SystemAction.delete,
			moduleItem: moduleItems.employee,
			itemId: employee._id.toString(),
			text: employee.name,
			userId: req.user._id,
			userEmail: req.user.email,
		});

		res.json({ data: "ok" });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};
