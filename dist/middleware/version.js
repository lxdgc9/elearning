"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.version = void 0;
const bad_req_1 = require("../error/bad-req");
function version(payload) {
  return function (req, res, next) {
    try {
      // kiểm tra phiên bản API
      const ver = req.header("x-api-version") || "v1";
      if (!payload[ver]) {
        throw new bad_req_1.BadReqErr(
          "Phiên Bản API Không Tồn Tại"
        );
      }
      payload[ver].call(this, req, res, next);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}
exports.version = version;
