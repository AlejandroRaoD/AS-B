export enum moduleItems {
	nucleo = "nucleo",
	user = "usuario",
	sede = "sede",
	employee = "employee",
	programa = "programa",
	catedra = "catedra",
	fiam = "fiam",
	student = "student",
	representative = "representative",
	studentRepresentative = "studentRepresentative",
	furniture = "furniture",
	instrument = "instrument",
	comodato = "comodato",
	enrollmentPeriod = "enrollmentPeriod",
	studentEnrollment = "studentEnrollment",
}

export const successMessages = {
	created: (item: moduleItems) => `the ${item} are created`,
};

export const ErrorsMessages = {
	notCreated: (item: moduleItems) => `the ${item} are not created`,
	notFound: (item: moduleItems) => `the ${item} not found`,
	duplicate: (item: moduleItems) => `the ${item} ready exist`,

	common: {
		duplicate: "item ready exist",
	},

	user: {
		notCreated: "notCreated",
		notFound: "user not found",
		notToken: "notToken",
		whenObtaining: "error when obtaining",
		whenObtainingProfile: "whenObtainingProfile",
	},

	nucleo: {
		alreadyExist: "nucleo name already exists",
		notCreated: "notCreated",
		notFound: "nucleo not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},

	sede: {
		notCreated: "notCreated",
		notFound: "sede not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},

	employee: {
		notCreated: "notCreated",
		notFound: "sede not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},

	programa: {
		notCreated: "notCreated",
		notFound: "sede not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},
	catedra: {
		notCreated: "notCreated",
		notFound: "sede not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},

	fiam: {
		notCreated: "notCreated",
		notFound: "sede not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},

	student: {
		notCreated: "notCreated",
		notFound: "sede not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},

	representative: {
		notCreated: "notCreated",
		notFound: "sede not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},

	studentRepresentative: {
		notCreated: "notCreated",
		notFound: "sede not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},

	furniture: {
		notCreated: "notCreated",
		notFound: "sede not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},

	instrument: {
		notCreated: "notCreated",
		notFound: "sede not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},

	comodato: {
		notCreated: "notCreated",
		notFound: "sede not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},

	enrollmentPeriod: {
		notCreated: "notCreated",
		notFound: "sede not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},

	studentEnrollment: {
		notCreated: "notCreated",
		notFound: "sede not found",
		whenObtaining: "error when obtaining",

		update: "update failed",
		delete: "delete fail",
	},
};
