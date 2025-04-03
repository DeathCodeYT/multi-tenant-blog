// Auth Controller
import { logout } from "./Auth/logout.controller.js";
import { signUp } from "./Auth/signup.controller.js";
import { tokenController } from "./Auth/token.controller.js";
import { login } from "./Auth/login.controller.js";
// Blog Controller
import { createBlog } from "./Blog/createBlog.controller.js";
import { deleteBlog } from "./Blog/deleteBlog.controller.js";
import { updateBlog } from "./Blog/updateBlog.controller.js";
import { getBlog, getBlogs } from "./Blog/getBlog.controller.js";
// User Controllers
import { changePassword } from "./User/changePassword.controller.js";
import {
  forgotPasswordSendOTP,
  forgotPasswordVerifyOTP,
} from "./User/forgotPassword.controller.js";
import { updateProfilePhoto } from "./User/updateProfilePhoto.controller.js";
import { verifyUserByOTP, sendVerifyOTP } from "./User/verifyUser.controller.js";
import { verifyUsername } from "./User/verifyUsername.controller.js";
import { updateUser } from "./User/updateUser.controller.js";
import { getLoginUser } from "./User/getLoginUser.controller.js";
// Admin Controllers
import { adminDeleteBlog } from "./Admin/Blog/adminDeleteBlog.controller.js";
import {
  addPermissionToUser,
  addPermissionToRole,
} from "./Admin/Permission/addPermission.controller.js";
import {
  deletePermissionFromRole,
  deletePermissionFromUser,
} from "./Admin/Permission/deletePermission.controller.js";
import { getPermissions } from "./Admin/Permission/getPermission.controller.js";
import { addRoleToUser, createRole } from "./Admin/Role/addRole.controller.js";
import { deleteRoleFromUser } from "./Admin/Role/deleteRole.controller.js";
import { banUser, unBanUser } from "./Admin/User/adminBanUser.controller.js";
import { adminDeleteUser } from "./Admin/User/adminDeleteUser.controller.js";

export {
  logout,
  signUp,
  tokenController,
  login,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
  getBlogs,
  changePassword,
  forgotPasswordSendOTP,
  forgotPasswordVerifyOTP,
  updateProfilePhoto,
  updateUser,
  getLoginUser,
  verifyUserByOTP,
  sendVerifyOTP,
  verifyUsername,
  adminDeleteBlog,
  addPermissionToUser,
  addPermissionToRole,
  deletePermissionFromRole,
  deletePermissionFromUser,
  getPermissions,
  addRoleToUser,
  createRole,
  deleteRoleFromUser,
  banUser,
  unBanUser,
  adminDeleteUser,
};
