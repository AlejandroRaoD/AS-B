import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import { employeeAttributes } from "../../employee/models/employee.model";

export enum UserPermissions {
	// estadisticas = "Ver estadisticas",
	// estadisticasEdit = "Editar estadisticas",
	personal = "Ver personal",
	personalEdit = "Editar personal",
	representantes = "Ver representantes",
	representantesEdit = "Editar representantes",
	estudiantes = "Ver estudiantes",
	estudiantesEdit = "Editar estudiantes",
	comodatos = "Ver comodatos",
	comodatosEdit = "Editar comodatos",
	periodos = "Ver periodos",
	periodosEdit = "Editar periodos",
	inscripciones = "Ver inscripciones",
	inscripcionesEdit = "Editar inscripciones",
	nucleos = "Ver nucleos",
	nucleosEdit = "Editar nucleos",
	sedes = "Ver sedes",
	sedesEdit = "Editar sedes",
	programa = "Ver programa",
	programaEdit = "Editar programa",
	catedra = "Ver catedra",
	catedraEdit = "Editar catedra",
	bienes = "Ver bienes",
	bienesEdit = "Editar bienes",
	instrumentos = "Ver instrumentos",
	instrumentosEdit = "Editar instrumentos",
	users = "vista de usuarios",
	usersEdit = "Editar de usuarios",
	documentos = "documentos",
	// documentosEdit = "Editar documentos",
	logs = "registros de actividades",
}

export interface UserAttributes {
	_id: string;
	email: string;
	password: string;
	permissions: UserPermissions[];
	employeeId: string;
}

export interface UserLoggedAttributes {
	_id: string;
	email: string;
	permissions: UserPermissions[];
	employeeId: employeeAttributes;
}

export interface User_from_DB extends Omit<UserAttributes, "_id">, Document {
	_id: mongoose.Schema.Types.ObjectId;
	comparePassword(passwordReceived: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, trim: true, require: true, unique: true },
		password: { type: String, require: true, default: "" },
		permissions: [{ type: String, enum: UserPermissions }],
		employeeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
			require: true,
		},
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	const user = this;

	if (!user.isModified("password")) next();

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);

	user.password = hash;

	next();
});

UserSchema.methods.comparePassword = async function (passwordReceived: string) {
	return await bcrypt.compare(passwordReceived, this.password);
};

export default mongoose.model<User_from_DB>("User", UserSchema);
