import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../middlewares/index.js";
import {
  ApiError,
  ApiRes,
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/index.js";
import slugify from "slugify";
import { Blog } from "../../models/index.js";

export const updateBlog = asyncWrapper(async (req, res, next) => {
  const { title, description, content } = req.body;
  const { slug } = req.params;
  const blog = await Blog.findOne({ slug }).populate("user","username name");
  if (!blog) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Blog not Exist");
  }
  if(blog.user.username !== req.user.username){
    throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized to update this blog");
  }
  if (title) blog.title = title;
  if (description) blog.description = description;
  if (content) blog.content = content;

  if (req.file) {
    const deleteResult = await deleteFromCloudinary(blog.thumbnailID);
    if(!deleteResult){
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to delete image from cloudinary")
    }
    const uploadResult = await uploadOnCloudinary(req.file.path);
    if (!uploadResult) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to upload image"
      );
    }
    blog.thumbnail = uploadResult.url;
    blog.thumbnailID = uploadResult.public_id;
  }
  await blog.save();
  res
    .status(StatusCodes.CREATED)
    .json(
      new ApiRes(
        StatusCodes.CREATED,
        blog,
        "Blog Updated"
      )
    );
});
