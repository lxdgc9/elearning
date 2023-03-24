import { Router } from "express";
import { check } from "express-validator";
import { API } from "../cfg/route";
import { login } from "../handler/auth/v1/login";
import { validReq } from "../middleware/valid-req";
import { version } from "../middleware/version";

const r = Router();

const { LOGIN } = API.AUTH;

// đăng nhập
r[LOGIN.METHOD](
  LOGIN.PATH,
  [
    check("username")
      .notEmpty()
      .withMessage("Yêu cầu tên tài khoản"),
    check("password")
      .notEmpty()
      .withMessage("Yêu cầu mật khẩu"),
  ],
  validReq,
  version({
    v1: login,
  })
);

export { r as authRouter };
