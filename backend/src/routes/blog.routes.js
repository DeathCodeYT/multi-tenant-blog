import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../controllers/index.js";
import { upload, verifyUser } from "../middlewares/index.js";
import { PERMISSIONS } from "../utils/permissions.js";
const router = express.Router();

router
  .route("/")
  .get(getBlogs)
  .post(
    verifyUser(PERMISSIONS.BLOG.CREATE),
    upload.single("thumbnail"),
    createBlog
  );
router
  .route("/:slug")
  .get(getBlog)
  .delete(verifyUser(PERMISSIONS.BLOG.DELETE), deleteBlog)
  .patch(
    verifyUser(PERMISSIONS.BLOG.UPDATE),
    upload.single("thumbnail"),
    updateBlog
  );

export const BlogRouter = router;
