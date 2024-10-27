import express from "express";
import {
	profile_controller,
	signin_user_controller,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/authJwt.middleware";
// import {
// 	profile_controller,
// 	signin_Admin_controller,
// 	signin_Student_controller,
// } from "../controllers/auth.controller";
// import { verifyToken } from "../middlewares/authJwt";

const router = express.Router();

// router.post("/signin/student", signin_Student_controller);

router.post("/signin", signin_user_controller);

router.get("/profile", verifyToken, profile_controller);

export default router;
