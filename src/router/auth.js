import { Router } from "express";
import { check } from "express-validator";

import { login } from "../handler/auth/v1/login";
import { redirectVer } from "../middleware/redirect-ver";
import { validReq } from "../middleware/valid-req";

const r = Router();

// Đăng nhập
r.post(
  "/api/users",
  [
    check("username")
      .notEmpty()
      .withMessage("Yêu cầu tên tài khoản"),
    check("password")
      .notEmpty()
      .withMessage("Yêu cầu mật khẩu"),
  ],
  validReq,
  redirectVer({
    v1: login,
  })
);

export { r as authRouter };
