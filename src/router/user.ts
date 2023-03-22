import { Router } from "express";
import { check } from "express-validator";
import { API } from "../cfg/route";
import { changePass } from "../handler/user/v1/change-pass";
import { getUsers } from "../handler/user/v1/get";
import { getUser } from "../handler/user/v1/get-by-id";
import { me } from "../handler/user/v1/me";
import { newUser } from "../handler/user/v1/new";
import { setRole } from "../handler/user/v1/set-role";
import { updateProf } from "../handler/user/v1/update-prof";
import { access } from "../middleware/access";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { validReq } from "../middleware/valid-req";
import { version } from "../middleware/version";

const r = Router();

const {
  GET,
  GET_BY_ID,
  NEW,
  CURR_USER,
  SET_ROLE,
  MOD_PROF,
  CHANGE_PASS,
} = API.USER;

r[CURR_USER.METHOD](
  CURR_USER.PATH,
  currUser,
  requireAuth,
  access(CURR_USER.ACCESS),
  version({
    v1: me,
  })
);

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  access(GET.ACCESS),
  version({
    v1: getUsers,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getUser,
  })
);

r[SET_ROLE.METHOD](
  SET_ROLE.PATH,
  currUser,
  requireAuth,
  access(SET_ROLE.ACCESS),
  version({
    v1: setRole,
  })
);

r[MOD_PROF.METHOD](
  MOD_PROF.PATH,
  currUser,
  requireAuth,
  access(MOD_PROF.ACCESS),
  version({
    v1: updateProf,
  })
);

r[CHANGE_PASS.METHOD](
  CHANGE_PASS.PATH,
  currUser,
  requireAuth,
  access(CHANGE_PASS.ACCESS),
  version({
    v1: changePass,
  })
);

r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
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
        minSymbols: 1,
      })
      .withMessage(
        "Mật Khẩu Phải Ít Nhất 6 Ký Tự Gồm Ký Tự Viết Hoa, Viết Thường Và Ký Tự Đặc Biệt"
      ),
    check("profile.fullName")
      .isAlpha("vi-VN", { ignore: " " })
      .withMessage(
        "Tên Người Dùng Chỉ Bao Gồm Ký Tự Trong Bảng Chữ Cái Tiếng Việt"
      )
      .optional({ nullable: true }),
    check("profile.dob")
      .isAfter("1900-01-01")
      .withMessage("Ngày Sinh Phải Từ Năm 1900 Trở Về Sau")
      .isBefore(
        new Date(Date.now() - 378683424000).toString()
      ) // yêu cầu đủ 12 tuổi
      .withMessage("Người Dùng Phải Đủ 12 Tuổi")
      .optional({ nullable: true }),
    check("profile.gender")
      .isIn(["male", "female", "other"])
      .withMessage("Giới Tính Không Hợp Lệ")
      .optional({ nullable: true }),
    check("profile.email")
      .isEmail()
      .withMessage("Email Không Hợp Lệ")
      .optional({ nullable: true }),
    check("profile.phone")
      .isLength({ min: 10, max: 11 })
      .withMessage("Số Điện Thoại Có Độ Dài Không Hợp Lệ")
      .isNumeric()
      .withMessage("Số Điện Thoại Không Hợp Lệ")
      .optional({ nullable: true }),
    check("profile.bio")
      .isEmail()
      .withMessage("Email Không Hợp Lệ")
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

export { r as userRouter };
