import express from "express";
import {
	createUser_controller,
	deleteUser_controller,
	getUser_controller,
	getUsers_controller,
	profile_controller,
	signin_user_controller,
	updateUser_controller,
} from "../user.controller";
import { verifyToken } from "../middlewares/authJwt.middleware";
import {
	CreateUserValidator,
	UpdateUserValidator,
} from "../validators/student.validator";

const router = express.Router();

router.post("/signin", signin_user_controller);
router.get("/profile", verifyToken, profile_controller);

router.get("/", getUsers_controller);
router.post("/", CreateUserValidator, createUser_controller);

router.get("/:id", getUser_controller);
router.put("/:id", UpdateUserValidator, updateUser_controller);
router.delete("/:id", deleteUser_controller);

export default router;
