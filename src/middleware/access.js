// Middleware này bao gồm danh sách quyền hạn (permissions)
// Nếu permission của người dùng tồn tại trong danh sách này
// thì người dùng sẽ được thông qua các middleware tiếp theo
//
// Permission của user sẽ nằm trong jwt được giải mã nhằm
// giảm tải truy vấn permission từ database. Do đó để tăng tính
// bảo mật, hệ thống sẽ giảm thời gian sống của accessToken và
// yêu cầu refreshToken sau khi hết hạn

const { FobiddenErr } = require("../error/forbidden");

function access(perms) {
  return async (req, res, next) => {
    try {
      // danh sách permission rỗng xem như người dùng
      // thông qua middleware này
      if (!perms || !perms.length) {
        next();
        return;
      }

      // kiểm tra permission trong jwt với danh sách
      // permission được cung cấp theo API endpoint
      if (
        req.user.perms &&
        req.user.perms.some((p) => perms.includes(p))
      ) {
        next();
        return;
      }

      // thông báo sẽ hiện nếu user không có permission
      throw new FobiddenErr("Không có quyền truy cập");
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = { access };
