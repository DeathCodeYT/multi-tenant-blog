import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../../middlewares/index.js";
import { Role, User } from "../../../models/index.js";
import { ApiError, ApiRes } from "../../../utils/index.js";

export const deleteRoleFromUser = asyncWrapper(async (req, res, next) => {
  const { username, email } = req.body;
  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User not exist");
  }
  let role = await Role.findOne({ roleValue: "user" });
  user.role = role._id;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json(new ApiRes(StatusCodes.OK, null, "User Role Updated successfully"));
});
