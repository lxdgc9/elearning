"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.userRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const route_1 = require("../cfg/route");
const access_1 = require("../handler/user/v1/access");
const change_pass_1 = require("../handler/user/v1/change-pass");
const get_1 = require("../handler/user/v1/get");
const get_by_id_1 = require("../handler/user/v1/get-by-id");
const me_1 = require("../handler/user/v1/me");
const new_1 = require("../handler/user/v1/new");
const new_many_1 = require("../handler/user/v1/new-many");
const set_role_1 = require("../handler/user/v1/set-role");
const update_prof_1 = require("../handler/user/v1/update-prof");
const access_2 = require("../middleware/access");
const active_1 = require("../middleware/active");
const current_user_1 = require("../middleware/current-user");
const require_auth_1 = require("../middleware/require-auth");
const valid_req_1 = require("../middleware/valid-req");
const version_1 = require("../middleware/version");
const r = (0, express_1.Router)();
exports.userRouter = r;
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
} = route_1.API.USER;
r[CURR_USER.METHOD](
  CURR_USER.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_2.access)(CURR_USER.ACCESS),
  (0, version_1.version)({
    v1: me_1.me,
  })
);
r[GET.METHOD](
  GET.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_2.access)(GET.ACCESS),
  (0, version_1.version)({
    v1: get_1.getUsers,
  })
);
r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_2.access)(GET_BY_ID.ACCESS),
  (0, version_1.version)({
    v1: get_by_id_1.getUser,
  })
);
r[SET_ROLE.METHOD](
  SET_ROLE.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_2.access)(SET_ROLE.ACCESS),
  (0, version_1.version)({
    v1: set_role_1.setRole,
  })
);
r[ACCESS.METHOD](
  ACCESS.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_2.access)(ACCESS.ACCESS),
  (0, version_1.version)({
    v1: access_1.accessUser,
  })
);
r[MOD_PROF.METHOD](
  MOD_PROF.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_2.access)(MOD_PROF.ACCESS),
  (0, version_1.version)({
    v1: update_prof_1.updateProf,
  })
);
r[CHANGE_PASS.METHOD](
  CHANGE_PASS.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_2.access)(CHANGE_PASS.ACCESS),
  (0, version_1.version)({
    v1: change_pass_1.changePass,
  })
);
r[NEW.METHOD](
  NEW.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_2.access)(NEW.ACCESS),
  [
    (0, express_validator_1.check)("username")
      .notEmpty()
      .withMessage("Yêu Cầu Tên Tài Khoản"),
    (0, express_validator_1.check)("password")
      .notEmpty()
      .withMessage("Yêu Cầu Mật Khẩu")
      .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 0,
      })
      .withMessage(
        "Mật Khẩu Phải Ít Nhất 6 Ký Tự Gồm Ký Tự Viết Hoa, Viết Thường"
      ),
    (0, express_validator_1.check)("fullName")
      .isAlpha("vi-VN", { ignore: " " })
      .withMessage(
        "Tên Người Dùng Chỉ Bao Gồm Ký Tự Trong Bảng Chữ Cái Tiếng Việt"
      )
      .optional({ nullable: true }),
    (0, express_validator_1.check)("dob")
      .isAfter("1900-01-01")
      .withMessage("Ngày Sinh Phải Từ Năm 1900 Trở Về Sau")
      .isBefore(
        new Date(Date.now() - 378683424000).toString()
      ) // yêu cầu đủ 12 tuổi
      .withMessage("Người Dùng Phải Đủ 12 Tuổi")
      .optional({ nullable: true }),
    (0, express_validator_1.check)("gender")
      .isIn(["male", "female", "other"])
      .withMessage("Giới Tính Không Hợp Lệ")
      .optional({ nullable: true }),
    (0, express_validator_1.check)("email")
      .isEmail()
      .withMessage("Email Không Hợp Lệ")
      .optional({ nullable: true }),
    (0, express_validator_1.check)("phone")
      .isLength({ min: 10, max: 11 })
      .withMessage("Số Điện Thoại Có Độ Dài Không Hợp Lệ")
      .isNumeric()
      .withMessage("Số Điện Thoại Không Hợp Lệ")
      .optional({ nullable: true }),
    (0, express_validator_1.check)("roleId")
      .notEmpty()
      .withMessage("Yêu Cầu Vai Trò Người Dùng"),
  ],
  valid_req_1.validReq,
  (0, version_1.version)({
    v1: new_1.newUser,
  })
);
r[NEW_MANY.METHOD](
  NEW_MANY.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_2.access)(NEW_MANY.ACCESS),
  [
    (0, express_validator_1.check)("users.*.username")
      .notEmpty()
      .withMessage("Yêu Cầu Tên Tài Khoản"),
    (0, express_validator_1.check)("users.*.password")
      .notEmpty()
      .withMessage("Yêu Cầu Mật Khẩu")
      .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 0,
      })
      .withMessage(
        "Mật Khẩu Phải Ít Nhất 6 Ký Tự Gồm Ký Tự Viết Hoa, Viết Thường"
      ),
    (0, express_validator_1.check)("users.*.fullName")
      .isAlpha("vi-VN", { ignore: " " })
      .withMessage(
        "Tên Người Dùng Chỉ Bao Gồm Ký Tự Trong Bảng Chữ Cái Tiếng Việt"
      )
      .optional({ nullable: true }),
    (0, express_validator_1.check)("users.*.dob")
      .isAfter("1900-01-01")
      .withMessage("Ngày Sinh Phải Từ Năm 1900 Trở Về Sau")
      .isBefore(
        new Date(Date.now() - 378683424000).toString()
      ) // yêu cầu đủ 12 tuổi
      .withMessage("Người Dùng Phải Đủ 12 Tuổi")
      .optional({ nullable: true }),
    (0, express_validator_1.check)("users.*.gender")
      .isIn(["male", "female", "other"])
      .withMessage("Giới Tính Không Hợp Lệ")
      .optional({ nullable: true }),
    (0, express_validator_1.check)("users.*.email")
      .isEmail()
      .withMessage("Email Không Hợp Lệ")
      .optional({ nullable: true }),
    (0, express_validator_1.check)("users.*.phone")
      .isLength({ min: 10, max: 11 })
      .withMessage("Số Điện Thoại Có Độ Dài Không Hợp Lệ")
      .isNumeric()
      .withMessage("Số Điện Thoại Không Hợp Lệ")
      .optional({ nullable: true }),
    (0, express_validator_1.check)("users.*.roleId")
      .notEmpty()
      .withMessage("Yêu Cầu Vai Trò Người Dùng"),
  ],
  valid_req_1.validReq,
  new_many_1.newManyUser
);
