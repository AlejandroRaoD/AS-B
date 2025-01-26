import app from "./app";
import { PORT } from "./config";
import connectToMongoDB from "./common/db";
// import userModel from "./auth/models/user.model";

(async () => {
	await connectToMongoDB();

	// todo: tareas por realizar
	console.warn("Validar la eliminacion de la sede");
	console.warn("Validar la eliminacion de la el periodo de inscripcion");

	// await new userModel({
	// 	email: "germancastrov30@gmail.com",
	// 	password: "123456",
	// 	permissions: [],
	// 	employeeId: "6794241c6a92dd12a9763bb5",
	// }).save();

	await app.listen(PORT);
})();
