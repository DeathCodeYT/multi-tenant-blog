import express from "express";
import {
  addPermissionToRole,
  addPermissionToUser,
  addRoleToUser,
  adminDeleteBlog,
  adminDeleteUser,
  banUser,
  createRole,
  deletePermissionFromRole,
  deletePermissionFromUser,
  deleteRoleFromUser,
  getPermissions,
  unBanUser,
} from "../controllers/index.js";
import { verifyUser } from "../middlewares/index.js";
import { PERMISSIONS } from "../utils/permissions.js";
const router = express.Router();

// user routes
router
  .route("/user")
  .patch(verifyUser(PERMISSIONS.ADMIN.DELETE_USER), adminDeleteUser);
router
  .route("/user/ban")
  .patch(verifyUser(PERMISSIONS.ADMIN.BAN_USER), banUser);
router
  .route("/user/unBan")
  .patch(verifyUser(PERMISSIONS.ADMIN.BAN_USER), unBanUser);
router
  .route("/user/role")
  .post(verifyUser(PERMISSIONS.ADMIN.ADD_ROLE_TO_USER), addRoleToUser)
  .patch(
    verifyUser(PERMISSIONS.ADMIN.DELETE_ROLE_FROM_USER),
    deleteRoleFromUser
  );
router
  .route("/user/permission")
  .post(
    verifyUser(PERMISSIONS.ADMIN.ADD_PERMISSION_TO_USER),
    addPermissionToUser
  )
  .patch(
    verifyUser(PERMISSIONS.ADMIN.DELETE_PERMISSION_FROM_USER),
    deletePermissionFromUser
  );
router
  .route("/role")
  .post(verifyUser(PERMISSIONS.ADMIN.CREATE_ROLE), createRole);
router
  .route("/role/permission")
  .post(
    verifyUser(PERMISSIONS.ADMIN.ADD_PERMISSION_TO_ROLE),
    addPermissionToRole
  )
  .patch(
    verifyUser(PERMISSIONS.ADMIN.DELETE_PERMISSION_FROM_ROLE),
    deletePermissionFromRole
  );
router.route("/permission").get(verifyUser(), getPermissions);
router
  .route("/blog/:slug")
  .delete(verifyUser(PERMISSIONS.ADMIN.DELETE_BLOG), adminDeleteBlog);

export const AdminRouter = router;
