import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../middlewares/index.js";
import {
  ApiError,
  ApiRes,
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/index.js";
export const updateProfilePhoto = asyncWrapper(async (req, res, next) => {
  if (!req.file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Photo not found");
  }
  const user = req.user;
  if (user.photoID) {
    const oldPhoto = await deleteFromCloudinary(user.photoID);
    if (!oldPhoto) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to delete old photo"
      );
    }
  }
  const uploadResult = await uploadOnCloudinary(req.file.path);
  if(!uploadResult){
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to upload photo")
  }
  user.photo = uploadResult.url;
  user.photoID = uploadResult.public_id;

  await user.save();
  res
    .status(StatusCodes.OK)
    .json(
      new ApiRes(StatusCodes.OK, { photo: user.photo }, "Profile Photo Updated")
    );
});
