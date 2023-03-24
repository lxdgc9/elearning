"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.BadReqErr = void 0;
const http_1 = require("./http");
class BadReqErr extends http_1.HttpErr {
  constructor(msg) {
    super(400, msg);
    this.name = "Bad Request Error";
  }
}
exports.BadReqErr = BadReqErr;
