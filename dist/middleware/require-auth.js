"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.requireAuth = void 0;
const unauthorized_1 = require("../error/unauthorized");
function requireAuth(req, res, next) {
  if (!req.user) {
    throw new unauthorized_1.UnauthorizedErr(
      "Không Được Ủy Quyền"
    );
  }
  next();
}
exports.requireAuth = requireAuth;
