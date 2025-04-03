import express from "express";
import { changePassword, forgotPasswordSendOTP, forgotPasswordVerifyOTP, getLoginUser, sendVerifyOTP, updateProfilePhoto, updateUser, verifyUserByOTP, verifyUsername } from "../controllers/index.js";
import { upload, verifyUser } from "../middlewares/index.js";
import { PERMISSIONS } from "../utils/permissions.js";
const router = express.Router();
router.route("/").patch(verifyUser(PERMISSIONS.USER.UPDATE),updateUser).get(verifyUser(),getLoginUser)
router.route("/changePassword").patch(verifyUser(PERMISSIONS.USER.CHANGE_PASSWORD),changePassword)
router.route("/forgotPasswordSendOTP").post(forgotPasswordSendOTP)
router.route("/forgotPassword").post(forgotPasswordVerifyOTP)
router.route("/sendVerifyOTP").post(sendVerifyOTP)
router.route("/verifyOTP").patch(verifyUserByOTP)
router.route("/profilePhoto").patch(verifyUser(PERMISSIONS.USER.UPDATE),upload.single("photo"),updateProfilePhoto)
router.route("/checkUsername/:username").get(verifyUsername)

export const UserRouter = router