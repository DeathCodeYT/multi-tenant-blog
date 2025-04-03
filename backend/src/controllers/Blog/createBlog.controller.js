import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../middlewares/index.js";
import { ApiError, ApiRes, uploadOnCloudinary } from "../../utils/index.js";
import slugify from "slugify";
import { Blog } from "../../models/index.js";

export const createBlog = asyncWrapper(async (req, res, next) => {
  const { title, description, content, slug } = req.body;
  if (!(title && description && content)) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Title, description and content are required"
    );
  }
  const blogObj = { title, description, content };
  if (slug) {
    blogObj.slug = slugify(slug, { lower: true, trim: true });
  } else {
    blogObj.slug = slugify(title, { lower: true, trim: true });
  }
  const existBlog = await Blog.findOne({ slug: blogObj.slug });
  if(existBlog){
    throw new ApiError(StatusCodes.BAD_REQUEST, "Blog with this slug already exists")
  }
  if (!req.file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Thumbnail is required");
  }
  const uploadResult = await uploadOnCloudinary(req.file.path);
  if (!uploadResult) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to upload image"
    );
  }
  blogObj.thumbnail = uploadResult.url;
  blogObj.thumbnailID = uploadResult.public_id;
  blogObj.user = req.user._id;
  const blog = new Blog(blogObj);
  await blog.save();
  res
    .status(StatusCodes.CREATED)
    .json(
      new ApiRes(
        StatusCodes.CREATED,
        { title: blog.title, slug: blog.slug },
        "Blog Created"
      )
    );
});
