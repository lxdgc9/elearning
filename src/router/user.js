const express = require("express");
const route = require("../cfg/route");
const valid = require("express-validator");
const uploader = require("../helper/uploader");
const access = require("../middleware/access");
const active = require("../middleware/active");
const version = require("../middleware/version");
const validReq = require("../middleware/valid-req");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
const accessUser = require("../handler/user/v1/access");
const changePass = require("../handler/user/v1/change-pass");
const getUsers = require("../handler/user/v1/get");
const getUser = require("../handler/user/v1/get-by-id");
const me = require("../handler/user/v1/me");
const newUser = require("../handler/user/v1/new");
const newManyUser = require("../handler/user/v1/new-many");
const updateProf = require("../handler/user/v1/update-prof");
const setRole = require("../handler/user/v1/set-role");
const { default: mongoose } = require("mongoose");
const BadReqErr = require("../error/bad-req");

const r = express.Router();

const {
  GET,
  GET_BY_ID,
  NEW,
  NEW_MANY,
  CURRENT_USER,
  SET_STATE,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
} = route.API.USER;

// Lấy chi tiết thông tin người dùng từ token
r[CURRENT_USER.METHOD](
  CURRENT_USER.PATH,
  currUser,
  requireAuth,
  active,
  access(CURRENT_USER.ACCESS),
  version({
    v1: me,
  })
);

// Lấy danh sách người dùng
r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  active,
  access(GET.ACCESS),
  version({
    v1: getUsers,
  })
);

// Lấy chi tiết thông tin người dùng
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
      .withMessage("Không tìm thấy người dùng"),
  ],
  validReq,
  version({
    v1: getUser,
  })
);

// Chặn người dùng truy cập
r[SET_STATE.METHOD](
  SET_STATE.PATH,
  currUser,
  requireAuth,
  active,
  access(SET_STATE.ACCESS),
  version({
    v1: accessUser,
  })
);

// Cập nhật hồ sơ cá nhân
r[UPDATE_PROFILE.METHOD](
  UPDATE_PROFILE.PATH,
  currUser,
  requireAuth,
  active,
  access(UPDATE_PROFILE.ACCESS),
  uploader.single("avatar"),
  version({
    v1: updateProf,
  })
);

// Đổi mật khẩu
r[CHANGE_PASSWORD.METHOD](
  CHANGE_PASSWORD.PATH,
  currUser,
  requireAuth,
  active,
  access(CHANGE_PASSWORD.ACCESS),
  version({
    v1: changePass,
  })
);

r.patch(
  "/api/users/role",
  currUser,
  requireAuth,
  active,
  access(),
  [
    valid
      .check("roleId")
      .isMongoId()
      .withMessage("Vai trò không hợp lệ"),
    valid
      .check("userIds")
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
        throw BadReqErr("Yêu cầu danh sách người dùng");
      }),
  ],
  validReq,
  version({
    v1: setRole,
  })
);

// Tạo người dùng
r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  active,
  access(NEW.ACCESS),
  [
    valid
      .check("username")
      .notEmpty()
      .withMessage("Yêu cầu tên tài khoản"),
    valid
      .check("password")
      .notEmpty()
      .withMessage("Yêu cầu mật khẩu")
      .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 0,
      })
      .withMessage(
        "Mật khẩu ít nhất 6 ký tư gồm: viết hoa, viết thường"
      ),
    valid
      .check("fullName")
      // .isAlpha("vi-VN", { ignore: " " })
      // .withMessage(
      //   "Họ và tên chỉ bao gồm ký tự trong bảng chữ cái Tiếng Việt"
      // )
      .optional({ nullable: true }),
    valid
      .check("dob")
      .isAfter("1900-01-01")
      .withMessage("Ngày sinh phải từ năm 1990 trở về sau")
      .isBefore(
        new Date(Date.now() - 378683424000).toString()
      ) // yêu cầu đủ 12 tuổi
      .withMessage("Người dùng phải đủ 12 tuổi")
      .optional({ nullable: true }),
    valid
      .check("gender")
      .toLowerCase()
      .isIn(["male", "female", "other"])
      .withMessage("Giới tính không hợp lệ")
      .optional({ nullable: true }),
    valid
      .check("email")
      .isEmail()
      .withMessage("Email không hợp lệ")
      .optional({ nullable: true }),
    valid
      .check("phone")
      .isLength({ min: 10, max: 11 })
      .withMessage("Số điện thoại không đúng định dạng")
      .isNumeric()
      .withMessage("Số điện thoại không hợp lệ")
      .optional({ nullable: true }),
    valid
      .check("roleId")
      .notEmpty()
      .withMessage("Yêu cầu vai trò người dùng"),
  ],
  validReq,
  version({
    v1: newUser,
  })
);

// Tạo nhiều người dùng
r[NEW_MANY.METHOD](
  NEW_MANY.PATH,
  currUser,
  requireAuth,
  active,
  access(NEW_MANY.ACCESS),
  [
    valid
      .check("users.*.username")
      .notEmpty()
      .withMessage("Yêu cầu tên tài khoản"),
    valid
      .check("users.*.password")
      .notEmpty()
      .withMessage("Yêu cầu mật khẩu")
      .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 0,
      })
      .withMessage(
        "Mật khẩu ít nhất 6 ký tư gồm: viết hoa, viết thường"
      ),
    valid
      .check("users.*.fullName")
      // .isAlpha("vi-VN", { ignore: " " })
      // .withMessage(
      //   "Họ và tên chỉ bao gồm ký tự trong bảng chữ cái Tiếng Việt"
      // )
      .optional({ nullable: true }),
    valid
      .check("users.*.dob")
      .isAfter("1900-01-01")
      .withMessage("Ngày sinh phải từ năm 1990 trở về sau")
      .isBefore(
        new Date(Date.now() - 378683424000).toString()
      ) // Yêu cầu đủ 12 tuổi
      .withMessage("Người dùng phải đủ 12 tuổi")
      .optional({ nullable: true }),
    valid
      .check("users.*.gender")
      .toLowerCase()
      .isIn(["male", "female", "other"])
      .withMessage("Giới tính không hợp lệ")
      .optional({ nullable: true }),
    valid
      .check("users.*.email")
      .isEmail()
      .withMessage("Email không hợp lệ")
      .optional({ nullable: true }),
    valid
      .check("users.*.phone")
      .isLength({ min: 10, max: 11 })
      .withMessage("Số điện thoại không đúng định dạng")
      .isNumeric()
      .withMessage("Số điện thoại không hợp lệ")
      .optional({ nullable: true }),
    valid
      .check("roleId")
      .notEmpty()
      .withMessage("Yêu cầu vai trò người dùng"),
  ],
  validReq,
  newManyUser
);

module.exports = r;
