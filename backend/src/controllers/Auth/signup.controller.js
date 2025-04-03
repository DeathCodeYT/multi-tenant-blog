import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../middlewares/index.js";
import {
  ApiError,
  ApiRes,
  validateEmail,
  validateUsername,
  PERMISSIONS
} from "../../utils/index.js";
import { Role, User } from "../../models/index.js";

export const signUp = asyncWrapper(async (req, res, next) => {
  const { name, email, username, password } = req.body;
  let existingUser = await User.findOne({ username });
  if (!validateUsername(username)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Username is not valid");
  }
  if (existingUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Username already exist.");
  }
  if (!validateEmail(email)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Email is not valid");
  }
  existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Email already exist.");
  }
  const user = new User({ name, password, email, username });
if(username==process.env.ADMIN_USERNAME){
  const role = await Role.findOne({ roleValue: "admin" });
  user.role = role._id;
}else{
  const role = await Role.findOne({ roleValue: "user" });
  user.role = role._id;
}
  user.permissions = [
    PERMISSIONS.USER.CHANGE_PASSWORD,
    PERMISSIONS.USER.UPDATE,
    PERMISSIONS.BLOG.CREATE,
    PERMISSIONS.BLOG.DELETE,
    PERMISSIONS.BLOG.UPDATE,
  ];
  await user.save();
  await user.sendOTP();

  return res.status(StatusCodes.CREATED).json(
    new ApiRes(
      StatusCodes.CREATED,
      {
        username: user.username,
        email: user.email,
        name: user.name,
      },
      "Account Created (Email Verification Sent)"
    )
  );
});
