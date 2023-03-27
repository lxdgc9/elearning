import { Router } from "express";
import { check, param } from "express-validator";
import { BadReqErr } from "../err/bad-req";

import { deletePerm } from "../handler/perm/v1/delete";
import { getPerms } from "../handler/perm/v1/get";
import { getPerm } from "../handler/perm/v1/get-by-id";
import { deleteGPerm } from "../handler/perm/v1/group/delete";
import { getGPerms } from "../handler/perm/v1/group/get";
import { newGPerm } from "../handler/perm/v1/group/new";
import { updateGPerm } from "../handler/perm/v1/group/update";
import { newPerm } from "../handler/perm/v1/new";
import { updatePerm } from "../handler/perm/v1/update";
import { accessCtrl } from "../middleware/access-ctrl";
import { checkUser } from "../middleware/check-user";
import { decodeJwt } from "../middleware/decode-jwt";
import { redirectVer } from "../middleware/redirect-ver";
import { requireAuth } from "../middleware/require-auth";
import { validReq } from "../middleware/valid-req";

const r = Router();

// Lấy danh sách quyền hạn
r.get(
  "/api/permissions",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  redirectVer({
    v1: getPerms,
  })
);

// Lấy danh sách quyền hạn theo nhóm
r.get(
  "/api/permissions/group",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  redirectVer({
    v1: getGPerms,
  })
);

// Lấy chi tiết thông tin quyền hạn
r.get(
  "/api/permissions/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Không tìm thấy quyền hạn"),
  ],
  validReq,
  redirectVer({
    v1: getPerm,
  })
);

// Tạo mới nhóm quyền
r.post(
  "/api/permissions/group",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    check("name")
      .notEmpty()
      .withMessage("Yêu cầu nhóm quyền"),
  ],
  validReq,
  redirectVer({
    v1: newGPerm,
  })
);

// Tạo mới quyền hạn
r.post(
  "/api/permissions",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    check("code")
      .notEmpty()
      .withMessage("Yêu cầu mã quyền hạn"),
    check("groupId")
      .notEmpty()
      .withMessage("Yêu cầu nhóm quyền")
      .isMongoId()
      .withMessage("Nhóm quyền không hợp lệ"),
    check("description")
      .isLength({ max: 255 })
      .withMessage("Mô tả quá dài, vượt quá 255 ký tự")
      .optional({ nullable: true }),
  ],
  validReq,
  redirectVer({
    v1: newPerm,
  })
);

// Cập nhật thông tin nhóm quyền
r.patch(
  "/api/permissions/group/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Nhóm quyền không hợp lệ"),
    check("name")
      .notEmpty()
      .withMessage("Yêu cầu nhóm quyền"),
    check("permissionIds")
      .isArray()
      .withMessage("Danh sách quyền hạn không hợp lệ")
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
    v1: updateGPerm,
  })
);

// Cập nhật thông tin quyền hạn
r.patch(
  "/api/permissions/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Quyền hạn không hợp lệ"),
    check("code")
      .notEmpty()
      .withMessage("Yêu cầu mã quyền hạn"),
    check("groupId")
      .notEmpty()
      .withMessage("Yêu cầu nhóm quyền")
      .isMongoId()
      .withMessage("Nhóm quyền không hợp lệ"),
    check("description")
      .isLength({ max: 255 })
      .withMessage("Mô tả quá dài, vượt quá 255 ký tự")
      .optional({ nullable: true }),
  ],
  validReq,
  redirectVer({
    v1: updatePerm,
  })
);

// Xóa nhóm quyền
r.delete(
  "/api/users/group/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  redirectVer({
    v1: deleteGPerm,
  })
);

// Xóa quyền hạn
r.delete(
  "/api/users/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Quyền hạn không hợp lệ"),
  ],
  validReq,
  redirectVer({
    v1: deletePerm,
  })
);

export { r as permRouter };
