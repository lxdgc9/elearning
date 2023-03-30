import { Router } from "express";
import { check, param } from "express-validator";

import { delPerm } from "../handler/perm/v1/del.js";
import { getPerm } from "../handler/perm/v1/get-id.js";
import { getPerms } from "../handler/perm/v1/get.js";
import { delPermGr } from "../handler/perm/v1/group/del.js";
import { getPermGr } from "../handler/perm/v1/group/get.js";
import { newPermGr } from "../handler/perm/v1/group/new.js";
import { modPermGr } from "../handler/perm/v1/group/mod.js";
import { newPerm } from "../handler/perm/v1/new.js";
import { modPerm } from "../handler/perm/v1/mod.js";
import { accessCtrl } from "../middleware/access-ctrl.js";
import { checkUser } from "../middleware/check-user.js";
import { decodeJwt } from "../middleware/decode-jwt.js";
import { redirectVer } from "../middleware/redirect-ver.js";
import { requireAuth } from "../middleware/require-auth.js";
import { validReq } from "../middleware/valid-req.js";

const r = Router();

r.get(
  "/api/perms",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  redirectVer({
    v1: getPerms,
  })
);

r.get(
  "/api/perms/:id",
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

r.post(
  "/api/perms",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    check("code")
      .notEmpty()
      .withMessage("Yêu cầu mã quyền hạn"),
    check("desc")
      .isLength({ max: 255 })
      .withMessage("Mô tả quá dài, vượt quá 255 ký tự")
      .optional({ nullable: true }),
    check("groupId")
      .notEmpty()
      .withMessage("Yêu cầu nhóm quyền")
      .isMongoId()
      .withMessage("Nhóm quyền không hợp lệ"),
  ],
  validReq,
  redirectVer({
    v1: newPerm,
  })
);

r.put(
  "/api/perms/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Quyền hạn không hợp lệ"),
    check("code")
      .isLength({ min: 1 })
      .withMessage("Mã quyền hạn không hợp lệ")
      .isLength({ max: 255 })
      .withMessage(
        "Mã quyền hạn quá dài, vượt quá 255 ký tự"
      )
      .optional({ nullable: true }),
    check("desc")
      .isLength({ max: 255 })
      .withMessage("Mô tả quá dài, vượt quá 255 ký tự")
      .optional({ nullable: true }),
    check("groupId")
      .isMongoId()
      .withMessage("Nhóm quyền không hợp lệ")
      .optional({ nullable: true }),
  ],
  validReq,
  redirectVer({
    v1: modPerm,
  })
);

r.delete(
  "/api/perms/:id",
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
    v1: delPerm,
  })
);

r.get(
  "/api/perm-gr",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  redirectVer({
    v1: getPermGr,
  })
);

r.post(
  "/api/perm-gr",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    check("name")
      .notEmpty()
      .withMessage("Yêu cầu tên nhóm quyền"),
  ],
  validReq,
  redirectVer({
    v1: newPermGr,
  })
);

r.put(
  "/api/perm-gr/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Nhóm quyền không hợp lệ"),
    check("name")
      .isLength({ min: 1 })
      .withMessage("Tên nhóm quyền không hợp lệ")
      .isLength({ max: 255 })
      .withMessage(
        "Tên nhóm quyền quá dài, vượt quá 255 ký tự"
      )
      .optional({ nullable: true }),
  ],
  validReq,
  redirectVer({
    v1: modPermGr,
  })
);

r.delete(
  "/api/perm-gr/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Nhóm quyền không hợp lệ"),
  ],
  validReq,
  redirectVer({
    v1: delPermGr,
  })
);

export { r as permRouter };
