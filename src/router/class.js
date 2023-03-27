const express = require("express");
const mongoose = require("mongoose");
const route = require("../cfg/route");
const valid = require("express-validator");
const BadReqErr = require("../err/bad-req").default;
const active = require("../middleware/active");
const access = require("../middleware/access");
const version = require("../middleware/version");
const validReq = require("../middleware/valid-req");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
const getClasses = require("../handler/class/v1/get");
const getClass = require("../handler/class/v1/get-by-id");
const newClass = require("../handler/class/v1/new");
const addMembers = require("../handler/class/v1/add-members");
const deleteMembers = require("../handler/class/v1/delete-members");
const updateClass = require("../handler/class/v1/update");
const deleteClass = require("../handler/class/v1/delete");

const r = express.Router();

const {
  GET,
  GET_BY_ID,
  NEW,
  ADD_MEMBERS,
  DELETE_MEMBERS,
  UPDATE,
  DELETE,
} = route.API.CLASS;

// Lấy danh sách lớp
r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  active,
  access(GET.ACCESS),
  version({
    v1: getClasses,
  })
);

// Lấy chi tiết thông tin lớp
r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  active,
  access(GET_BY_ID.ACCESS),
  [
    valid
      .param("id")
      .isMongoId()
      .withMessage("Không tìm thấy lớp học"),
  ],
  validReq,
  version({
    v1: getClass,
  })
);

// Tạo mới lớp
r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  active,
  access(NEW.ACCESS),
  [
    valid
      .check("name")
      .notEmpty()
      .withMessage("Tên cầu tên lớp"),
    valid
      .check("session")
      .notEmpty()
      .withMessage("Tên cầu niên khóa"),
    valid
      .check("description")
      .isLength({ max: 255 })
      .withMessage("Mô tả quá dài, vượt quá 255 ký tự")
      .optional({ nullable: true }),
    valid
      .check("memberIds")
      .isArray()
      .withMessage("Danh sách thành viên không hợp lệ")
      .custom((v) => {
        if (v.length > 0) {
          const isValid = v.every((id) =>
            mongoose.Types.ObjectId.isValid(id)
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
  version({
    v1: newClass,
  })
);

// Thêm thành viên vào lớp
r[ADD_MEMBERS.METHOD](
  ADD_MEMBERS.PATH,
  currUser,
  requireAuth,
  active,
  access(ADD_MEMBERS.ACCESS),
  [
    valid
      .param("id")
      .isMongoId()
      .withMessage("Lớp học không hợp lệ"),
    valid
      .check("memberIds")
      .isArray()
      .withMessage("Danh sách thành viên không hợp lệ")
      .custom((v) => {
        if (v.length > 0) {
          const isValid = v.every((id) =>
            mongoose.Types.ObjectId.isValid(id)
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
  version({
    v1: addMembers,
  })
);

// Xóa thành viên khỏi lớp
r[DELETE_MEMBERS.METHOD](
  DELETE_MEMBERS.PATH,
  currUser,
  requireAuth,
  active,
  access(ADD_MEMBERS.ACCESS),
  [
    valid
      .param("id")
      .isMongoId()
      .withMessage("Lớp học không hợp lệ"),
    valid
      .check("memberIds")
      .isArray()
      .withMessage("Danh sách thành viên không hợp lệ")
      .custom((v) => {
        if (v.length > 0) {
          const isValid = v.every((id) =>
            mongoose.Types.ObjectId.isValid(id)
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
  version({
    v1: deleteMembers,
  })
);

// Cập nhật thông tin lớp
r[UPDATE.METHOD](
  UPDATE.PATH,
  currUser,
  requireAuth,
  active,
  access(UPDATE.ACCESS),
  [
    valid
      .param("id")
      .isMongoId()
      .withMessage("Lớp học không hợp lệ"),
    valid
      .check("name")
      .isLength({ min: 1 })
      .withMessage("Tên lớp không được trống")
      .optional({ nullable: true }),
    valid
      .check("session")
      .isLength({ min: 1 })
      .withMessage("Niên khóa không được trống")
      .optional({ nullable: true }),
    valid
      .check("description")
      .isLength({ max: 255 })
      .withMessage("Mô tả quá dài, vượt quá 255 ký tự")
      .optional({ nullable: true }),
  ],
  validReq,
  version({
    v1: updateClass,
  })
);

// Xóa lớp
r[DELETE.METHOD](
  DELETE.PATH,
  currUser,
  requireAuth,
  active,
  access(DELETE.ACCESS),
  [
    valid
      .param("id")
      .isMongoId()
      .withMessage("Lớp học không hợp lệ"),
  ],
  validReq,
  version({
    v1: deleteClass,
  })
);

module.exports = r;
