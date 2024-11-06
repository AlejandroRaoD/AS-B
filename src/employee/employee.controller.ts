import { Request, Response } from "express";
import {
	createEmployee_service,
	deleteEmployee_service,
	getEmployees_service,
	getOneEmployee_service,
	updateEmployee_service,
} from "./employee.service";
import getEmployeeDataOfRequest from "./helpers/getEmployeeData.helper";
import { ErrorsMessages } from "../config/messages";
import { errorHandlerHelper } from "../common/helpers/errorHandler.helper";

export const createEmployee_controller = async (
	req: Request,
	res: Response
) => {
	const data = getEmployeeDataOfRequest(req.body);

	try {
		const employee = await createEmployee_service(data);

		res.status(201).json({ data: employee });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getEmployees_controller = async (_req: Request, res: Response) => {
	// const query = req.query

	try {
		const employees = await getEmployees_service();

		res.status(200).json({ data: employees });
	} catch (error) {
		errorHandlerHelper(error, res);
	}
};

export const getOneEmployee_controller = async (
	req: Request,
	res: Response
) => {
	const { id: _id } = req.params;

	try {
		const employee = await getOneEmployee_service(_id);

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
		const data = getEmployeeDataOfRequest(req.body);

		const employee = await updateEmployee_service(_id, data);

		res.json({ data: employee });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.employee.update });
	}
};

export const deleteEmployee_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const { id: _id } = req.params;

		await deleteEmployee_service(_id);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json({ error: true, message: ErrorsMessages.employee.delete });
	}
};
