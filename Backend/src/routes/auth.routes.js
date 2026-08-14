import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { validateRegister } from "../validators/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";
const authRouter = express.Router();
/*
@route POST /api/auth/register
@desc Register a new user
@access Public
*/
authRouter.post("/register", validateRegister, authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/verify-email", authController.verifyEmail);
authRouter.get("/get-me", authUser, authController.getMe);
export default authRouter;
