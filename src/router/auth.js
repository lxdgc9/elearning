const express = require("express");
const route = require("../cfg/route");
const valid = require("express-validator");
const login = require("../handler/auth/v1/login");
const validReq = require("../middleware/valid-req");
const version = require("../middleware/version");

const r = express.Router();

const { LOGIN } = route.API.AUTH;

// Đăng nhập 
r[LOGIN.METHOD](
  LOGIN.PATH,
  [
    valid
      .check("username")
      .notEmpty()
      .withMessage("Yêu cầu tên tài khoản"),
    valid
      .check("password")
      .notEmpty()
      .withMessage("Yêu cầu mật khẩu"),
  ],
  validReq,
  version({
    v1: login,
  })
);

module.exports = r;
