import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../middlewares/index.js";
import { ApiError, ApiRes } from "../../utils/index.js";
export const changePassword = asyncWrapper(async (req, res, next) => {
  const { newPassword, oldPassword } = req.body;
  if (!(newPassword && oldPassword)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Credentials");
  }
  const user = req.user;
  const checkPassword = await user.comparePasswords(String(oldPassword));
  if (!checkPassword) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Incorrect Old Password");
  }
  user.password = newPassword;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json(new ApiRes(StatusCodes.OK, null, "Password Updated"));
});
