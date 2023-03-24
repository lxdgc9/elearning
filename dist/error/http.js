"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.HttpErr = void 0;
class HttpErr extends Error {
  constructor(code, msg) {
    super(msg);
    this.name = "Http Error";
    this.code = code;
  }
}
exports.HttpErr = HttpErr;
