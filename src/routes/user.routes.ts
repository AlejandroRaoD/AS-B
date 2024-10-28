import express from "express";
import {
	profile_controller,
	signin_user_controller,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/authJwt.middleware";

const router = express.Router();

router.post("/signin", signin_user_controller);

router.get("/profile", verifyToken, profile_controller);

export default router;
