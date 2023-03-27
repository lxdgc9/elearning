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
const updateChann = require("../handler/channel/v1/update");
const deleteChannel = require("../handler/channel/v1/delete");

const r = express.Router();

// Lấy danh sách kênh
r.get(
  "/api/channels",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: getChannels,
  })
);

// Lấy danh sách kênh của một lớp
r.get(
  "/api/channels/class/:classId",
  currUser,
  requireAuth,
  active,
  access(),
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
r.get(
  "/api/channels/:id",
  currUser,
  requireAuth,
  active,
  access(),
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
r.post(
  "/api/channels",
  currUser,
  requireAuth,
  active,
  access(),
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
r.patch(
  "/api/channels/add-members/:id",
  currUser,
  requireAuth,
  active,
  access(),
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
r.patch(
  "/api/channels/delete-members/:id",
  currUser,
  requireAuth,
  active,
  access(),
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
r.patch(
  "/api/channels/:id",
  currUser,
  requireAuth,
  active,
  access(),
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
    v1: updateChann,
  })
);

// Xóa kênh
r.delete(
  "/api/channels/:id",
  currUser,
  requireAuth,
  active,
  access(),
  [
    valid
      .param("id")
      .isMongoId()
      .withMessage("Lớp học không hợp lệ"),
  ],
  validReq,
  version({
    v1: deleteChannel,
  })
);

module.exports = r;
