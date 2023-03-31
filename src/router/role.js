import { Router } from "express";
import { check, param } from "express-validator";
import { Types } from "mongoose";

import { BadReqErr } from "../err/bad-req.js";
import { apply } from "../handler/role/v1/apply-users.js";
import { delRole } from "../handler/role/v1/del.js";
import { getRole } from "../handler/role/v1/get-id.js";
import { getRoles } from "../handler/role/v1/get.js";
import { newRole } from "../handler/role/v1/new.js";
import { modRole } from "../handler/role/v1/mod.js";
import { accessCtrl } from "../middleware/access-ctrl.js";
import { checkUser } from "../middleware/check-user.js";
import { decodeJwt } from "../middleware/decode-jwt.js";
import { redirectVer } from "../middleware/redirect-ver.js";
import { requireAuth } from "../middleware/require-auth.js";
import { validReq } from "../middleware/valid-req.js";

const r = Router();

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
    check("desc")
      .isLength({ max: 255 })
      .withMessage("Mô tả quá dài, vượt quá 255 ký tự")
      .optional({ nullable: true }),
    check("permIds")
      .isArray()
      .withMessage("Danh sánh quyền hạn không hợp lệ")
      .custom((v) => {
        if (v.length > 0) {
          const isValid = v.every((id) =>
            Types.ObjectId.isValid(id)
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

r.put(
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
      .isLength({ min: 1 })
      .withMessage("Tên vai trò không hợp lệ")
      .isLength({ max: 255 })
      .withMessage(
        "Tên vai trò quá dài, vượt quá 255 ký tự"
      )
      .optional({ nullable: true }),
    check("desc")
      .isLength({ max: 255 })
      .withMessage("Mô tả quá dài, vượt quá 255 ký tự")
      .optional({ nullable: true }),
    check("permIds")
      .isArray()
      .withMessage("Danh sánh quyền hạn không hợp lệ")
      .custom((v) => {
        if (v.length > 0) {
          const isValid = v.every((id) =>
            Types.ObjectId.isValid(id)
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
    v1: modRole,
  })
);

r.patch(
  "/api/roles/apply/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Vai trò không hợp lệ"),
    check("userIds")
      .isArray()
      .withMessage("Danh sách người dùng không hợp lệ")
      .custom((v) => {
        if (v.length > 0) {
          const isValid = v.every((id) =>
            Types.ObjectId.isValid(id)
          );
          if (!isValid) {
            throw new BadReqErr(
              "Tồn tại người dùng không hợp lệ trong danh sách"
            );
          }
          return true;
        }
        throw new BadReqErr("Danh sách người dùng rỗng");
      }),
  ],
  validReq,
  redirectVer({
    v1: apply,
  })
);

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
    v1: delRole,
  })
);

export { r as roleRouter };
