import app from "./app";
import { PORT } from "./config";
import connectToMongoDB from "./common/db";

(async () => {
	await connectToMongoDB();


	// todo: tareas por realizar
	console.warn("Validar la eliminacion de la sede");
	console.warn("Validar la eliminacion de la el periodo de inscripcion");


	await app.listen(PORT);
})();
