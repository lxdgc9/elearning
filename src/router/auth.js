import { Router } from "express";
import { check } from "express-validator";

import { login } from "../handler/auth/v1/login.js";
import { redirectVer } from "../middleware/redirect-ver.js";
import { validReq } from "../middleware/valid-req.js";

const r = Router();

// Đăng nhập
r.post(
  "/api/auth/login",
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
