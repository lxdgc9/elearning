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
exports.newUser = void 0;
const bad_req_1 = require("../../../error/bad-req");
const role_1 = require("../../../model/role");
const user_1 = require("../../../model/user");
function newUser(req, res, next) {
  return __awaiter(this, void 0, void 0, function* () {
    const {
      username,
      password,
      fullName,
      gender,
      dob,
      email,
      phone,
      provinceId,
      districtId,
      wardId,
      street,
      roleId,
      hasAccess,
    } = req.body;
    try {
      // kiểm tra username
      const extUser = yield user_1.User.findOne({
        username,
      });
      if (extUser) {
        throw new bad_req_1.BadReqErr(
          "Tài Khoản Đã Tồn Tại"
        );
      }
      // kiểm tra roleId
      const role = yield role_1.Role.findById(roleId);
      if (!role) {
        throw new bad_req_1.BadReqErr(
          "Vai Trò Không Hợp Lệ"
        );
      }
      // tạo user
      const user = user_1.User.build({
        username,
        password,
        profile: {
          fullName,
          gender,
          dob,
          email,
          phone,
          address: {
            provinceId,
            districtId,
            wardId,
            street,
          },
        },
        role: role.id,
        hasAccess,
      });
      yield user.save();
      // fetch user
      const _user = yield user_1.User.findById(user.id)
        .select("-logs -classes")
        .populate("role");
      res.status(201).json({
        message: `Tạo người dùng ${_user.profile.fullName} với vai trò ${_user.role.name} thành công`,
        user: _user,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}
exports.newUser = newUser;
