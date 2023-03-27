import { Router } from "express";
import { check, param } from "express-validator";
import { Types } from "mongoose";

import { BadReqErr } from "../err/bad-req.js";
import { addMembers } from "../handler/class/v1/add-members.js";
import { deleteMembers } from "../handler/class/v1/delete-members.js";
import { deleteClass } from "../handler/class/v1/delete.js";
import { getClass } from "../handler/class/v1/get-by-id.js";
import { getClasses } from "../handler/class/v1/get.js";
import { newClass } from "../handler/class/v1/new.js";
import { updateClass } from "../handler/class/v1/update.js";
import { accessCtrl } from "../middleware/access-ctrl.js";
import { checkUser } from "../middleware/check-user.js";
import { decodeJwt } from "../middleware/decode-jwt.js";
import { redirectVer } from "../middleware/redirect-ver.js";
import { requireAuth } from "../middleware/require-auth.js";
import { validReq } from "../middleware/valid-req.js";

const r = Router();

// Lấy danh sách lớp
r.get(
  "/api/classes",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  redirectVer({
    v1: getClasses,
  })
);

// Lấy chi tiết thông tin lớp
r.get(
  "/api/classes/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Không tìm thấy lớp học"),
  ],
  validReq,
  redirectVer({
    v1: getClass,
  })
);

// Tạo mới lớp
r.post(
  "/api/classes",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    check("name").notEmpty().withMessage("Tên cầu tên lớp"),
    check("session")
      .notEmpty()
      .withMessage("Tên cầu niên khóa"),
    check("description")
      .isLength({ max: 255 })
      .withMessage("Mô tả quá dài, vượt quá 255 ký tự")
      .optional({ nullable: true }),
    check("memberIds")
      .isArray()
      .withMessage("Danh sách thành viên không hợp lệ")
      .custom((v) => {
        if (v.length > 0) {
          const isValid = v.every((id) =>
            Types.ObjectId.isValid(id)
          );
          if (!isValid) {
            throw new BadReqErr(
              "Tồn tại thành viên không hợp lệ trong danh sách"
            );
          }
        }
        return true;
      })
      .optional({ nullable: true }),
  ],
  validReq,
  redirectVer({
    v1: newClass,
  })
);

// Thêm thành viên vào lớp
r.patch(
  "/api/classes/add-members/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Lớp học không hợp lệ"),
    check("memberIds")
      .isArray()
      .withMessage("Danh sách thành viên không hợp lệ")
      .custom((v) => {
        if (v.length > 0) {
          const isValid = v.every((id) =>
            Types.ObjectId.isValid(id)
          );
          if (!isValid) {
            throw new BadReqErr(
              "Tồn tại thành viên không hợp lệ trong danh sách"
            );
          }
          return true;
        }
        throw new BadReqErr("Danh sách thành viên rỗng");
      }),
  ],
  validReq,
  redirectVer({
    v1: addMembers,
  })
);

// Xóa thành viên khỏi lớp
r.patch(
  "/api/classes/delete-members/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Lớp học không hợp lệ"),
    check("memberIds")
      .isArray()
      .withMessage("Danh sách thành viên không hợp lệ")
      .custom((v) => {
        if (v.length > 0) {
          const isValid = v.every((id) =>
            Types.ObjectId.isValid(id)
          );
          if (!isValid) {
            throw new BadReqErr(
              "Tồn tại thành viên không hợp lệ trong danh sách"
            );
          }
          return true;
        }
        throw new BadReqErr("Danh sách thành viên rỗng");
      }),
  ],
  validReq,
  redirectVer({
    v1: deleteMembers,
  })
);

// Cập nhật thông tin lớp
r.patch(
  "/api/classes/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Lớp học không hợp lệ"),
    check("name")
      .isLength({ min: 1 })
      .withMessage("Tên lớp không được trống")
      .optional({ nullable: true }),
    check("session")
      .isLength({ min: 1 })
      .withMessage("Niên khóa không được trống")
      .optional({ nullable: true }),
    check("description")
      .isLength({ max: 255 })
      .withMessage("Mô tả quá dài, vượt quá 255 ký tự")
      .optional({ nullable: true }),
  ],
  validReq,
  redirectVer({
    v1: updateClass,
  })
);

// Xóa lớp
r.delete(
  "/api/classes/:id",
  decodeJwt,
  requireAuth,
  checkUser,
  accessCtrl(),
  [
    param("id")
      .isMongoId()
      .withMessage("Lớp học không hợp lệ"),
  ],
  validReq,
  redirectVer({
    v1: deleteClass,
  })
);

export { r as classRouter };
