import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../../middlewares/index.js";
import { Blog, User } from "../../../models/index.js";
import { ApiError, ApiRes } from "../../../utils/index.js";

export const adminDeleteUser = asyncWrapper(async (req, res, next) => {
  const { username, email } = req.body;
  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User not exist");
  }
  await Blog.deleteMany({user:user._id})
  await User.findByIdAndDelete(user._id)
  res
    .status(StatusCodes.OK)
    .json(new ApiRes(StatusCodes.OK, null, "User deleted successfully"));
});

