export enum Gender {
	Masculine = "m",
	Feminine = "f",
	Other = "other",
}

export enum BusinessPosition {
	fiam = "fiam",
	other = "other",
}

// ****************************************************************************
// 										         usuarios
// ****************************************************************************

export enum UserRoles {
	student = "student",
	admin = "admin",
}

export enum UserPermissions {
	// documentos de pregrado
	UndergraduateDocument_administrativo = "UndergraduateDocument_administrativo",
	UndergraduateDocument_Edit = "UndergraduateDocumentEdit",
	UndergraduateDocument_Delete = "UndergraduateDocumentDelete",

	// archivos / uploads

	Files_Delete = "Files_Delete",

	// documentos de pregrado

	docReqDace = "docReqDace",
	docReqDaceCompleteList = "docReqDaceCompleteList",
	docReqDace_print = "docReqDace_print",
	docReqDace_delivery = "docReqDace_delivery",
	docReqDaceDelete = "docReqDaceDelete",

	// pagos
	paymentFundesurg = "paymentFundesurg",
	paymentFundesurg_CompleteList = "paymentFundesurg_CompleteList",
	paymentFundesurg_validate = "paymentFundesurg_validate",
	paymentEdit = "paymentEdit",
	paymentDelete = "paymentDelete",
}
