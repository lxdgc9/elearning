"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.validReq = void 0;
const express_validator_1 = require("express-validator");
const req_validate_1 = require("../error/req-validate");
function validReq(req, res, next) {
  const errs = (0, express_validator_1.validationResult)(
    req
  );
  if (!errs.isEmpty()) {
    throw new req_validate_1.ReqValidateErr(
      errs.array()[0].msg
    );
  }
  next();
}
exports.validReq = validReq;
