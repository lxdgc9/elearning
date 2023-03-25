const express = require("express");
const mongoose = require("mongoose");
const route = require("../cfg/route");
const valid = require("express-validator");
const BadReqErr = require("../error/bad-req");
const active = require("../middleware/active");
const access = require("../middleware/access");
const version = require("../middleware/version");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
const getClasses = require("../handler/class/v1/get");
const getClass = require("../handler/class/v1/get-by-id");
const newClass = require("../handler/class/v1/new");
const addMembers = require("../handler/class/v1/add-members");
const updateClass = require("../handler/class/v1/update");
const deleteClass = require("../handler/class/v1/delete");
const deleteMembers = require("../handler/class/v1/delete-members");
const validReq = require("../middleware/valid-req");
const getChannels = require("../handler/channel/v1/get");
const newChannel = require("../handler/channel/v1/new");
const getChannel = require("../handler/channel/v1/get-by-id");
const getByClass = require("../handler/channel/v1/get-by-class-id");

const r = express.Router();

const {
  GET,
  GET_BY_CLASS_ID,
  GET_BY_ID,
  NEW,
  ADD_MEMBERS,
  DELETE_MEMBERS,
  UPDATE,
  DELETE,
} = route.API.CHANNEL;

// Lấy danh sách kênh
r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  active,
  access(GET.ACCESS),
  version({
    v1: getChannels,
  })
);

// Lấy danh sách kênh của một lớp
r[GET_BY_CLASS_ID.METHOD](
  GET_BY_CLASS_ID.PATH,
  currUser,
  requireAuth,
  active,
  access(GET_BY_CLASS_ID.ACCESS),
  [
    valid
      .param("classId")
      .isMongoId()
      .withMessage("Không tìm thấy lớp học"),
  ],
  validReq,
  version({
    v1: getByClass,
  })
);

// Lấy chi tiết thông tin kênh
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
      .withMessage("Không tìm thấy kênh"),
  ],
  validReq,
  version({
    v1: getChannel,
  })
);

// Tạo mới kênh
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
      .withMessage("Tên cầu tên kênh"),
    valid
      .check("classId")
      .isMongoId()
      .withMessage("Lớp học không hợp lệ"),
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
    v1: newChannel,
  })
);

// Thêm thành viên vào kênh
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

// Xóa thành viên khỏi kênh
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

// Cập nhật thông tin kênh
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

// Xóa kênh
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
