import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../../middlewares/index.js";
import { Role, User } from "../../../models/index.js";
import { ApiError, ApiRes, PERMISSIONS } from "../../../utils/index.js";

export const getPermissions = asyncWrapper(async (req, res, next) => {
  const { username, roleValue } = req.query;
  if (username) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "user not exist");
    }
    return res
      .status(StatusCodes.OK)
      .json(new ApiRes(StatusCodes.OK, user.permissions));
  } else if (roleValue) {
    const role = await Role.findOne({ roleValue });
    if (!role) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "role not exist");
    }
    return res
      .status(StatusCodes.OK)
      .json(new ApiRes(StatusCodes.OK, role.permissions));
  } else {
    const permissionsList = Object.values(PERMISSIONS).flatMap((group) =>
      Object.values(group)
    );
    return res
      .status(StatusCodes.OK)
      .json(new ApiRes(StatusCodes.OK, permissionsList));
  }
});
