"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.NotFoundErr = void 0;
const http_1 = require("./http");
class NotFoundErr extends http_1.HttpErr {
  constructor(msg) {
    super(404, msg);
    this.name = "Not Found Error";
  }
}
exports.NotFoundErr = NotFoundErr;
