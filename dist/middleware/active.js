"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.active = void 0;
const forbidden_1 = require("../error/forbidden");
function active(req, res, next) {
  if (!req.user.hasAccess) {
    throw new forbidden_1.FobiddenErr(
      "Không Có Quyền Truy Cập"
    );
  }
  next();
}
exports.active = active;
