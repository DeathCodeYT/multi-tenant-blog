import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../middlewares/index.js";
import { ApiError, ApiRes } from "../../utils/index.js";
import { User } from "../../models/index.js";
export const verifyUsername = asyncWrapper(async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Username already exists");
  }
  res
    .status(StatusCodes.OK)
    .json(new ApiRes(StatusCodes.OK, { username }, "Username is available"));
});
