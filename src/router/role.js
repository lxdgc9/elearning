import { Router } from "express";
import { check, param } from "express-validator";

import { BadReqErr } from "../err/bad-req.js";
import { deleteRole } from "../handler/role/v1/delete.js";
import { getRole } from "../handler/role/v1/get-by-id.js";
import { getRoles } from "../handler/role/v1/get.js";
import { newRole } from "../handler/role/v1/new.js";
import { updateRole } from "../handler/role/v1/update.js";
import { accessCtrl } from "../middleware/access-ctrl.js";
import { checkUser } from "../middleware/check-user.js";
import { decodeJwt } from "../middleware/decode-jwt.js";
import { redirectVer } from "../middleware/redirect-ver.js";
import { requireAuth } from "../middleware/require-auth.js";
import { validReq } from "../middleware/valid-req.js";

const r = Router();

// Lấy danh sách vai trò
r.get(
  "/api/roles",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  redirectVer({
    v1: getRoles,
  })
);

// Lấy chi tiết thông tin vai trò
r.get(
  "/api/roles/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Không tìm thấy vai trò"),
  ],
  validReq,
  redirectVer({
    v1: getRole,
  })
);

// Tạo mới vai trò
r.post(
  "/api/roles",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    check("name")
      .notEmpty()
      .withMessage("Yêu cầu tên vai trò"),
    check("description")
      .isLength({ max: 255 })
      .withMessage("Mô tả quá dài, vượt quá 255 ký tự")
      .optional({ nullable: true }),
    check("permissionIds")
      .isArray()
      .withMessage("Danh sánh quyền hạn không hợp lệ")
      .custom((v) => {
        if (v.length > 0) {
          const isValid = v.every((id) =>
            mongoose.Types.ObjectId.isValid(id)
          );
          if (!isValid) {
            throw new BadReqErr(
              "Tồn tại quyền hạn không hợp lệ trong danh sách"
            );
          }
        }
        return true;
      })
      .optional({ nullable: true }),
  ],
  validReq,
  redirectVer({
    v1: newRole,
  })
);

// Cập nhật thông tin vai trò
r.patch(
  "/api/roles/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Vai trò không hợp lệ"),
    check("name")
      .notEmpty()
      .withMessage("Yêu cầu tên vai trò"),
    check("description")
      .isLength({ max: 255 })
      .withMessage("Mô tả quá dài, vượt quá 255 ký tự")
      .optional({ nullable: true }),
    check("permissionIds")
      .isArray()
      .withMessage("Danh sánh quyền hạn không hợp lệ")
      .custom((v) => {
        if (v.length > 0) {
          const isValid = v.every((id) =>
            mongoose.Types.ObjectId.isValid(id)
          );
          if (!isValid) {
            throw new BadReqErr(
              "Tồn tại quyền hạn không hợp lệ trong danh sách"
            );
          }
        }
        return true;
      }),
  ],
  validReq,
  redirectVer({
    v1: updateRole,
  })
);

// Xóa vai trò
r.delete(
  "/api/roles/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Vai trò không hợp lệ"),
  ],
  validReq,
  redirectVer({
    v1: deleteRole,
  })
);

export { r as roleRouter };
