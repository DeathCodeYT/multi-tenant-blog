import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../../middlewares/index.js";
import { Role, User } from "../../../models/index.js";
import { ApiError, ApiRes } from "../../../utils/index.js";

export const addPermissionToUser = asyncWrapper(async (req, res, next) => {
  const { permission, username } = req.body;
  if (!(username && permission)) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "username and permission is required"
    );
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "user not exist");
  }
  user.permissions.push(permission);
  await user.save();
  res
    .status(StatusCodes.OK)
    .json(new ApiRes(StatusCodes.OK, permission, "Permission added"));
});
export const addPermissionToRole = asyncWrapper(async (req, res, next) => {
  const { permission, roleValue } = req.body;
  if (!(roleValue && permission)) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "roleValue and permission is required"
    );
  }
  const role = await Role.findOne({ roleValue });
  if (!role) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "role not exist");
  }
  role.permissions.push(permission);
  await role.save();
  res
    .status(StatusCodes.OK)
    .json(new ApiRes(StatusCodes.OK, permission, "Permission added"));
});
