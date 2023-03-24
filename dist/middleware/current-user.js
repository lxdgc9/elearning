"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.currUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const unauthorized_1 = require("../error/unauthorized");
function currUser(req, res, next) {
  var _a;
  try {
    const token =
      (_a = req.headers["authorization"]) === null ||
      _a === void 0
        ? void 0
        : _a.split("Bearer ")[1];
    if (!token) {
      throw new unauthorized_1.UnauthorizedErr(
        "Yêu Cầu Token"
      );
    }
    const decoded = (0, jsonwebtoken_1.verify)(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}
exports.currUser = currUser;
