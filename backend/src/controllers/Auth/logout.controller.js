import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../middlewares/index.js";
import { ApiRes } from "../../utils/index.js";
import { User } from "../../models/index.js";

export const logout = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.user._id)
  await user.logout(res)
  res
    .status(StatusCodes.OK)
    .json(new ApiRes(StatusCodes.OK, {}, "Account Logout"));
});
