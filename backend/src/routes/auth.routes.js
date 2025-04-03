import express from "express";
import { login, logout, signUp, tokenController } from "../controllers/index.js";
import { verifyUser } from "../middlewares/index.js";
const router = express.Router();
router.route('/login').post(login)
router.route('/signup').post(signUp)
router.route('/logout').post(verifyUser(),logout)
router.route('/autoReLogin').post(tokenController)
export const AuthRouter = router