"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FobiddenErr = void 0;
const http_1 = require("./http");
class FobiddenErr extends http_1.HttpErr {
  constructor(msg) {
    super(403, msg);
    this.name = "Fobidden Error";
  }
}
exports.FobiddenErr = FobiddenErr;
