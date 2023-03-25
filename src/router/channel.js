const express = require("express");
const route = require("../cfg/route");
const valid = require("express-validator");
// Middlewares
const active = require("../middleware/active");
const access = require("../middleware/access");
const version = require("../middleware/version");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
// Routes
const getClasses = require("../handler/class/v1/get");
const getClass = require("../handler/class/v1/get-by-id");
// const addMembers = require("../handler/class/v1/alloc-user");
// const deleteMembers = require("../handler/class/v1/remove-user");
const updateClass = require("../handler/class/v1/update");
const deleteClass = require("../handler/class/v1/delete");
const newChannel = require("../handler/channel/v1/new");
const validReq = require("../middleware/valid-req");
const { default: mongoose } = require("mongoose");
const BadReqErr = require("../error/bad-req");

const r = express.Router();

const {
  GET,
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
    v1: getClasses,
  })
);

// Lấy chi tiết thông tin kênh
r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  active,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getClass,
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
      .notEmpty()
      .withMessage("Yêu cầu lớp học")
      .custom((v) => {
        if (!mongoose.Types.ObjectId.isValid(v)) {
          throw new BadReqErr("Lớp học không hợp lệ");
        }
        return true;
      }),
    valid
      .check("description")
      .isLength({ max: 255 })
      .withMessage("Mô tả quá dài, vượt quá 255 ký tự")
      .optional({ nullable: true }),
    valid
      .check("memberIds")
      .isArray()
      .withMessage("Yêu cầu danh sách thành viên")
      .custom((v) => {
        if (v.length > 0) {
          const isValid = v.every((id) =>
            mongoose.Types.ObjectId.isValid(id)
          );
          if (!isValid) {
            throw new BadReqErr(
              "Danh sách thành viên không hợp lệ"
            );
          }
        }
        return true;
      }),
  ],
  validReq,
  version({
    v1: newChannel,
  })
);

// Thêm thành viên vào kênh
// r[ADD_MEMBERS.METHOD](
//   ADD_MEMBERS.PATH,
//   currUser,
//   requireAuth,
//   active,
//   access(ADD_MEMBERS.ACCESS),
//   version({
//     v1: allocUser,
//   })
// );

// Xóa thành viên khỏi kênh
// r[DELETE_MEMBERS.METHOD](
//   DELETE_MEMBERS.PATH,
//   currUser,
//   requireAuth,
//   active,
//   access(ADD_MEMBERS.ACCESS),
//   version({
//     v1: removeUser,
//   })
// );

// Cập nhật thông tin kênh
r[UPDATE.METHOD](
  UPDATE.PATH,
  currUser,
  requireAuth,
  active,
  access(UPDATE.ACCESS),
  version({
    v1: updateClass,
  })
);

// xóa kênh
r[DELETE.METHOD](
  DELETE.PATH,
  currUser,
  requireAuth,
  active,
  access(DELETE.ACCESS),
  version({
    v1: deleteClass,
  })
);

module.exports = r;
