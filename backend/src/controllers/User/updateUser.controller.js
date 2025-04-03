import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../middlewares/index.js";
import { User } from "../../models/index.js";
import { ApiError, ApiRes, validateUsername } from "../../utils/index.js";
export const updateUser = asyncWrapper(async (req, res, next) => {
  const { name, username } = req.body;
  const user = req.user;
  user.name = name || user.name;
  if (username) {
    if (!validateUsername(username)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Username");
    }
    const isUserExist = await User.exists({ username });
    if (isUserExist && isUserExist.username !== user.username) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Username already in use");
    }
    user.username = username;
  }
  await user.save();
  res.status(StatusCodes.OK).json(
    new ApiRes(
      StatusCodes.OK,
      {
        username: user.username,
        name: user.name,
        email: user.email,
      },
      "User Updated"
    )
  );
});
