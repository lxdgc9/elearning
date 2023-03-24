"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.UnauthorizedErr = void 0;
const http_1 = require("./http");
class UnauthorizedErr extends http_1.HttpErr {
  constructor(msg) {
    super(401, msg);
    this.name = "Unauthorized Error";
  }
}
exports.UnauthorizedErr = UnauthorizedErr;
