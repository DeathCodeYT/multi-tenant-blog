import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../middlewares/index.js";
import jsonwebtoken from "jsonwebtoken";
import { ApiError, ApiRes } from "../../utils/index.js";
import { User } from "../../models/index.js";

export const tokenController = asyncWrapper(async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    const decodeToken = jsonwebtoken.verify(
      refreshToken,
      process.env.JWT_SECRET
    );
    const user = await User.findOne({
      username: decodeToken.username,
    }).populate("role");
    if (user.refreshToken != refreshToken) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Token");
    }
    const accessToken = user.genrateAccessToken(res);
    const newRefreshToken = await user.genrateRefreshToken();
    user.refreshToken = newRefreshToken;
    await user.save();
    res.status(StatusCodes.OK).json(
      new ApiRes(
        StatusCodes.OK,
        {
          accessToken,
          refreshToken: newRefreshToken,
        },
        "Access Token Updated"
      )
    );
  } catch (error) {
    next(error);
  }
});
