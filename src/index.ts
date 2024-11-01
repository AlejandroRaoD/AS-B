import app from "./app";
import { PORT } from "./config";
import connectToMongoDB from "./common/db";

(async () => {
	await connectToMongoDB();

	await app.listen(PORT);
})();
