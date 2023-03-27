import { Router } from "express";
import { check, param } from "express-validator";
import { BadReqErr } from "../err/bad-req";
import { deleteRole } from "../handler/role/v1/delete";

import { getRoles } from "../handler/role/v1/get";
import { getRole } from "../handler/role/v1/get-by-id";
import { newRole } from "../handler/role/v1/new";
import { updateRole } from "../handler/role/v1/update";
import { accessCtrl } from "../middleware/access-ctrl";
import { checkUser } from "../middleware/check-user";
import { decodeJwt } from "../middleware/decode-jwt";
import { redirectVer } from "../middleware/redirect-ver";
import { requireAuth } from "../middleware/require-auth";
import { validReq } from "../middleware/valid-req";

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
  version({
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
