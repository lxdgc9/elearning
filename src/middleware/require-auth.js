const UnauthorizedErr = require("../error/unauthorized");

function requireAuth(req, res, next) {
  if (!req.user) {
    throw new UnauthorizedErr("Không dược ủy quyền");
  }
  next();
}

module.exports = requireAuth;
