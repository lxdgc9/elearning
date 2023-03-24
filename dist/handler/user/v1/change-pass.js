"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (
      resolve,
      reject
    ) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step(
        (generator = generator.apply(
          thisArg,
          _arguments || []
        )).next()
      );
    });
  };
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.changePass = void 0;
const bad_req_1 = require("../../../error/bad-req");
const password_1 = require("../../../helper/password");
const user_1 = require("../../../model/user");
function changePass(req, res, next) {
  return __awaiter(this, void 0, void 0, function* () {
    const { id } = req.user;
    const {
      currentPassword: currPass,
      newPassword: newPass,
    } = req.body;
    try {
      const user = yield user_1.User.findById(id);
      // kiểm tra currPass
      const isMatch = yield password_1.Password.compare(
        user.password,
        currPass
      );
      if (!isMatch) {
        throw new bad_req_1.BadReqErr(
          "Sai Mật Khẩu. Đổi Mật Khẩu Thất Bại"
        );
      }
      // đổi mật khẩu
      user.password = newPass;
      yield user.save();
      res.json({});
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}
exports.changePass = changePass;
