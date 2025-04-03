import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../middlewares/index.js";
import { ApiError, ApiRes } from "../../utils/index.js";
export const getLoginUser = asyncWrapper(async (req, res, next) => {
  const user = req.user;
  res.status(StatusCodes.OK).json(
    new ApiRes(
      StatusCodes.OK,
      {
        username: user.username,
        email: user.email,
        name: user.name,
        photo: user.photo ? user.photo : "",
        roleName:user.role.roleName,
        roleValue:user.role.roleValue
      },
      "User"
    )
  );
});
