// Middleware này giải mã jwt từ client
// lưu trữ thông tin giải mã qua session truyền đến các
// middleware tiếp theo xử lý

const { verify } = require("jsonwebtoken");
const { Types } = require("mongoose");
const {
  UnauthorizedErr,
} = require("../error/unauthorized");

function currUser(req, res, next) {
  try {
    // tách bearer token
    const token =
      req.headers["authorization"]?.split("Bearer ")[1];
    if (!token) {
      throw new UnauthorizedErr("Yêu cầu token");
    }

    // giải mã token
    const decoded = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // truyền thông tin đã giải mã đến middleware tiếp theo
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { currUser };
