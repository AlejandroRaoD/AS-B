export enum moduleItems {
	nucleo = "nucleo",
	user = "usuario",
	sede = "sede",
	employee = "empleado",
	programa = "programa",
	catedra = "catedra",
	fiam = "fiam",
	student = "estudiante",
	representative = "representante",
	studentRepresentative = "relacion",
	furniture = "inventario",
	instrument = "intrumento",
	comodato = "comodato",
	enrollmentPeriod = "perioodo de inscripcion",
	studentEnrollment = "inscripcion de estudiante",
}

export const successMessages = {
	created: (item: moduleItems) => `the ${item} are created`,
};

export const ErrorMsg = {
	errorInData: (item: moduleItems) => `Hay algun error en los datos del ${item}`,
	notCreated: (item: moduleItems) => `El/La ${item} no fue creado`,
	notFound: (item: moduleItems) => `${item} no encontrado`,
	alreadyExist: (item: moduleItems) => `El/La ${item} ya existe`,
	onUpdate: (item: moduleItems) => `El/La ${item} no fue actualizado`,
	onDelete: (item: moduleItems) => `El/La ${item} no fue eliminado`,
	hasDependencies: (item: moduleItems) => `El/La ${item} tiene dependencias`,

	common: {
		internal: "Error en el servidor",
		duplicate: "el item ya existe",
	},

	user: {
		errorCredentials:"Correo/Contraseña incorrecta",
		notCreated: "notCreated",
		notFound: "user not found",
		notToken: "notToken",
		whenObtaining: "error when obtaining",
		whenObtainingProfile: "whenObtainingProfile",
	},
};
