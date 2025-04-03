import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/index.js";
import { asyncWrapper } from "./asyncWrapper.js";

export const verifyUser = (permission = null) =>
  asyncWrapper(async (req, res, next) => {
   if (!req.user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Login Required");
    }
    if (permission) {
      if (req.user.role.roleValue == "admin") {
        return next();
      }
      const allUserPermissions = [
        ...req.user.permissions,
        ...req.user.role?.permissions,
      ];
      if (allUserPermissions.includes(permission)) {
        return next();
      }
      throw new ApiError(StatusCodes.FORBIDDEN, "Forbidden");
    }
    return next();
  });
