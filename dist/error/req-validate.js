"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ReqValidateErr = void 0;
const http_1 = require("./http");
class ReqValidateErr extends http_1.HttpErr {
  constructor(msg) {
    super(400, msg);
    this.name = "Request Validation Error";
  }
}
exports.ReqValidateErr = ReqValidateErr;
