// Middleware này bắt lỗi từ express-validator
// thông báo lỗi đầu tiên gặp phải
//
// Doc: https://express-validator.github.io/docs

const valid = require("express-validator");
const ReqValidateErr = require("../error/req-validate");

function validReq(req, res, next) {
  const errs = valid.validationResult(req);
  if (!errs.isEmpty()) {
    throw new ReqValidateErr(errs.array()[0].msg);
  }
  next();
}

module.exports = validReq;
