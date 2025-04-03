import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../middlewares/index.js";
import { ApiError, ApiRes, uploadOnCloudinary } from "../../utils/index.js";
import { Blog, User } from "../../models/index.js";

export const getBlog = asyncWrapper(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Please Provide Slug");
  }
  const blog = await Blog.findOne({ slug }).populate("user", "username name");
  if (!blog) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Blog Not Found");
  }
  res.status(StatusCodes.OK).json(new ApiRes(StatusCodes.OK, blog, "OK"));
});
export const getBlogs = asyncWrapper(async (req, res) => {
  const { page, limit, text, username } = req.query;
  const query = {};
  const pagination = {};
  if (username) {
    const user = await User.findOne({ username });
    if (user) query.user = user._id;
  }
  if (text?.trim()) {
    query["$or"] = [
      { title: { $regex: text, $options: "i" } },
      { description: { $regex: text, $options: "i" } },
      { content: { $regex: text, $options: "i" } },
    ];
  }
  pagination.page = parseInt(page) || 1;
  pagination.limit = parseInt(limit) || 10;
  pagination.offSet = pagination.page * pagination.limit - pagination.limit;

  const blogs = await Blog.find(query)
    .populate("user", "username name")
    .sort("-createdAt")
    .skip(pagination.offSet)
    .limit(pagination.limit);
  const blogsCount = await Blog.countDocuments(query);
  if (blogsCount % pagination.limit == 0) {
    pagination.totalPage = Math.floor(blogsCount / pagination.limit);
  } else {
    pagination.totalPage = Math.floor(blogsCount / pagination.limit) + 1;
  }
  res
    .status(StatusCodes.OK)
    .json(new ApiRes(StatusCodes.OK, blogs, "All Blogs...", { ...pagination }));
});
