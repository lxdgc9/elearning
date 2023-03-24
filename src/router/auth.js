const { Router } = require("express");
const { check } = require("express-validator");
const { API } = require("../cfg/route");
const { login } = require("../handler/auth/v1/login");
const { validReq } = require("../middleware/valid-req");
const { version } = require("../middleware/version");

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

module.exports = {
  authRouter: r,
};
