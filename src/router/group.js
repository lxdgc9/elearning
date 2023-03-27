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
const getGroups = require("../handler/group/v1/get");
const newGroup = require("../handler/group/v1/new");
const getGroup = require("../handler/group/v1/get-by-id");
const getByClass = require("../handler/channel/v1/get-by-class-id");
const updateGroup = require("../handler/group/v1/update");

const r = express.Router();

// Lấy danh sách nhóm
r.get(
  "/api/groups",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: getGroups,
  })
);

// Lấy danh sách kênh của một lớp
r.get(
  "/api/groups/channel/:classId",
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
  "/api/groups/:id",
  currUser,
  requireAuth,
  active,
  access(),
  [
    valid
      .param("id")
      .isMongoId()
      .withMessage("Không tìm thấy nhóm"),
  ],
  validReq,
  version({
    v1: getGroup,
  })
);

// Tạo mới nhóm
r.post(
  "/api/groups",
  currUser,
  requireAuth,
  active,
  access(),
  [
    valid
      .check("name")
      .notEmpty()
      .withMessage("Tên cầu tên nhóm"),
    valid
      .check("channelId")
      .isMongoId()
      .withMessage("Kênh không hợp lệ"),
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
    v1: newGroup,
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

// Cập nhật thông tin nhóm
r.patch(
  "/api/groups/:id",
  currUser,
  requireAuth,
  active,
  access(),
  [],
  validReq,
  version({
    v1: updateGroup,
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
    v1: deleteClass,
  })
);

module.exports = r;
