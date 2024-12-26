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

export const ErrorMsg = {
	errorInData: (item: moduleItems) => `the ${item} are errors in data`,
	notCreated: (item: moduleItems) => `the ${item} are not created`,
	notFound: (item: moduleItems) => `the ${item} not found`,
	alreadyExist: (item: moduleItems) => `the ${item} ready exist`,
	onUpdate: (item: moduleItems) => `the ${item} not updated`,
	onDelete: (item: moduleItems) => `the ${item} not deleted`,
	hasDependencies: (item: moduleItems) => `the ${item} has dependencies`,

	common: {
		internal: "internal server error",
		duplicate: "item ready exist",
	},

	user: {
		notCreated: "notCreated",
		notFound: "user not found",
		notToken: "notToken",
		whenObtaining: "error when obtaining",
		whenObtainingProfile: "whenObtainingProfile",
	},
};
