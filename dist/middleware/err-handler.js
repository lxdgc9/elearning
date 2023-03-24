"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.errHandler = void 0;
const http_1 = require("../error/http");
function errHandler(err, req, res, next) {
  if (err instanceof http_1.HttpErr) {
    return res
      .status(err.code)
      .send({ message: err.message });
  }
  res.status(500).send({
    message: "Có Gì Đó Sai Sai",
  });
}
exports.errHandler = errHandler;
