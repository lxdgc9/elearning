import { Router } from "express";
import { check } from "express-validator";
import { API } from "../cfg/route";
import { accessUser } from "../handler/user/v1/access";
import { changePass } from "../handler/user/v1/change-pass";
import { getUsers } from "../handler/user/v1/get";
import { getUser } from "../handler/user/v1/get-by-id";
import { me } from "../handler/user/v1/me";
import { newUser } from "../handler/user/v1/new";
import { newManyUser } from "../handler/user/v1/new-many";
import { setRole } from "../handler/user/v1/set-role";
import { updateProf } from "../handler/user/v1/update-prof";
import { access } from "../middleware/access";
import { active } from "../middleware/active";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { validReq } from "../middleware/valid-req";
import { version } from "../middleware/version";

const r = Router();

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
} = API.USER;

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

r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  active,
  access(NEW.ACCESS),
  [
    check("username")
      .notEmpty()
      .withMessage("Yêu Cầu Tên Tài Khoản"),
    check("password")
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
    check("fullName")
      .isAlpha("vi-VN", { ignore: " " })
      .withMessage(
        "Tên Người Dùng Chỉ Bao Gồm Ký Tự Trong Bảng Chữ Cái Tiếng Việt"
      )
      .optional({ nullable: true }),
    check("dob")
      .isAfter("1900-01-01")
      .withMessage("Ngày Sinh Phải Từ Năm 1900 Trở Về Sau")
      .isBefore(
        new Date(Date.now() - 378683424000).toString()
      ) // yêu cầu đủ 12 tuổi
      .withMessage("Người Dùng Phải Đủ 12 Tuổi")
      .optional({ nullable: true }),
    check("gender")
      .isIn(["male", "female", "other"])
      .withMessage("Giới Tính Không Hợp Lệ")
      .optional({ nullable: true }),
    check("email")
      .isEmail()
      .withMessage("Email Không Hợp Lệ")
      .optional({ nullable: true }),
    check("phone")
      .isLength({ min: 10, max: 11 })
      .withMessage("Số Điện Thoại Có Độ Dài Không Hợp Lệ")
      .isNumeric()
      .withMessage("Số Điện Thoại Không Hợp Lệ")
      .optional({ nullable: true }),
    check("roleId")
      .notEmpty()
      .withMessage("Yêu Cầu Vai Trò Người Dùng"),
  ],
  validReq,
  version({
    v1: newUser,
  })
);

r[NEW_MANY.METHOD](
  NEW_MANY.PATH,
  currUser,
  requireAuth,
  active,
  access(NEW_MANY.ACCESS),
  [
    check("users.*.username")
      .notEmpty()
      .withMessage("Yêu Cầu Tên Tài Khoản"),
    check("users.*.password")
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
    check("users.*.fullName")
      .isAlpha("vi-VN", { ignore: " " })
      .withMessage(
        "Tên Người Dùng Chỉ Bao Gồm Ký Tự Trong Bảng Chữ Cái Tiếng Việt"
      )
      .optional({ nullable: true }),
    check("users.*.dob")
      .isAfter("1900-01-01")
      .withMessage("Ngày Sinh Phải Từ Năm 1900 Trở Về Sau")
      .isBefore(
        new Date(Date.now() - 378683424000).toString()
      ) // yêu cầu đủ 12 tuổi
      .withMessage("Người Dùng Phải Đủ 12 Tuổi")
      .optional({ nullable: true }),
    check("users.*.gender")
      .isIn(["male", "female", "other"])
      .withMessage("Giới Tính Không Hợp Lệ")
      .optional({ nullable: true }),
    check("users.*.email")
      .isEmail()
      .withMessage("Email Không Hợp Lệ")
      .optional({ nullable: true }),
    check("users.*.phone")
      .isLength({ min: 10, max: 11 })
      .withMessage("Số Điện Thoại Có Độ Dài Không Hợp Lệ")
      .isNumeric()
      .withMessage("Số Điện Thoại Không Hợp Lệ")
      .optional({ nullable: true }),
    check("users.*.roleId")
      .notEmpty()
      .withMessage("Yêu Cầu Vai Trò Người Dùng"),
  ],
  validReq,
  newManyUser
);

export { r as userRouter };
