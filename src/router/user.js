const express = require("express");
const route = require("../cfg/route");
const valid = require("express-validator");

// Middlewares
const access = require("../middleware/access");
const active = require("../middleware/active");
const version = require("../middleware/version");
const validReq = require("../middleware/valid-req");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");

// Handlers
const accessUser = require("../handler/user/v1/access");
const changePass = require("../handler/user/v1/change-pass");
const getUsers = require("../handler/user/v1/get");
const getUser = require("../handler/user/v1/get-by-id");
const me = require("../handler/user/v1/me");
const newUser = require("../handler/user/v1/new");
const newManyUser = require("../handler/user/v1/new-many");
const setRole = require("../handler/user/v1/set-role");
const updateProf = require("../handler/user/v1/update-prof");

const r = express.Router();

const {
  GET,
  GET_BY_ID,
  NEW,
  NEW_MANY,
  CURR_USER,
  SET_ROLE,
  ACCESS,
  MOD_PROF,
  CHANGE_PASS,
} = route.API.USER;

// fetch user từ token
r[CURR_USER.METHOD](
  CURR_USER.PATH,
  currUser,
  requireAuth,
  active,
  access(CURR_USER.ACCESS),
  version({
    v1: me,
  })
);

// lấy danh sách user
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

// lấy thông tin chi tiết user
r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  active,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getUser,
  })
);

// gán role vào nhiều user
r[SET_ROLE.METHOD](
  SET_ROLE.PATH,
  currUser,
  requireAuth,
  active,
  access(SET_ROLE.ACCESS),
  version({
    v1: setRole,
  })
);

// enable/disable user
r[ACCESS.METHOD](
  ACCESS.PATH,
  currUser,
  requireAuth,
  active,
  access(ACCESS.ACCESS),
  version({
    v1: accessUser,
  })
);

// cập nhật hồ sơ cá nhân
r[MOD_PROF.METHOD](
  MOD_PROF.PATH,
  currUser,
  requireAuth,
  active,
  access(MOD_PROF.ACCESS),
  version({
    v1: updateProf,
  })
);

// đổi mật khẩu
r[CHANGE_PASS.METHOD](
  CHANGE_PASS.PATH,
  currUser,
  requireAuth,
  active,
  access(CHANGE_PASS.ACCESS),
  version({
    v1: changePass,
  })
);

// tạo user
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
      .isAlpha("vi-VN", { ignore: " " })
      .withMessage(
        "Họ và tên chỉ bao gồm ký tự trong bảng chữ cái Tiếng Việt"
      )
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

// Tạo nhiều user
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
      .isAlpha("vi-VN", { ignore: " " })
      .withMessage(
        "Họ và tên chỉ bao gồm ký tự trong bảng chữ cái Tiếng Việt"
      )
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
      .check("users.*.roleId")
      .notEmpty()
      .withMessage("Yêu cầu vai trò người dùng"),
  ],
  validReq,
  newManyUser
);

module.exports = r;
