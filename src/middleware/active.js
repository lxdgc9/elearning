// Middleware này sẽ kiểm tra hasAccess đã giải mã trong jwt
// nếu hasAccess = false, tức người dùng bị block quyền
// truy cập, mọi thao tác với api endpoint đều vô nghĩa.
//
// Tất hiên, middleware này sẽ yêu cầu giải mã jwt(currUser)

const FobiddenErr = require("../error/forbidden");

function active(req, res, next) {
  if (!req.user.hasAccess) {
    throw new FobiddenErr("Không có quyền truy cập");
  }
  next();
}

module.exports = active;
