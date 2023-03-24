"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.authRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const route_1 = require("../cfg/route");
const login_1 = require("../handler/auth/v1/login");
const valid_req_1 = require("../middleware/valid-req");
const version_1 = require("../middleware/version");
const r = (0, express_1.Router)();
exports.authRouter = r;
const { LOGIN } = route_1.API.AUTH;
r[LOGIN.METHOD](
  LOGIN.PATH,
  [
    (0, express_validator_1.check)("username")
      .notEmpty()
      .withMessage("Yêu Cầu Tên Tài Khoản"),
    (0, express_validator_1.check)("password")
      .notEmpty()
      .withMessage("Yêu Cầu Mật Khẩu"),
  ],
  valid_req_1.validReq,
  (0, version_1.version)({
    v1: login_1.login,
  })
);
