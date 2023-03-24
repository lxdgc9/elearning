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
var __asyncValues =
  (this && this.__asyncValues) ||
  function (o) {
    if (!Symbol.asyncIterator)
      throw new TypeError(
        "Symbol.asyncIterator is not defined."
      );
    var m = o[Symbol.asyncIterator],
      i;
    return m
      ? m.call(o)
      : ((o =
          typeof __values === "function"
            ? __values(o)
            : o[Symbol.iterator]()),
        (i = {}),
        verb("next"),
        verb("throw"),
        verb("return"),
        (i[Symbol.asyncIterator] = function () {
          return this;
        }),
        i);
    function verb(n) {
      i[n] =
        o[n] &&
        function (v) {
          return new Promise(function (resolve, reject) {
            (v = o[n](v)),
              settle(resolve, reject, v.done, v.value);
          });
        };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function (v) {
        resolve({ value: v, done: d });
      }, reject);
    }
  };
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.newManyUser = void 0;
const bad_req_1 = require("../../../error/bad-req");
const role_1 = require("../../../model/role");
const user_1 = require("../../../model/user");
function newManyUser(req, res, next) {
  var _a, e_1, _b, _c;
  return __awaiter(this, void 0, void 0, function* () {
    const { users } = req.body;
    try {
      // kiểm tra username
      const extUsers = yield user_1.User.find({
        username: { $in: users.map((u) => u.username) },
      });
      if (extUsers.length > 0) {
        throw new bad_req_1.BadReqErr(
          "Tên Người Dùng Đã Tồn Tại"
        );
      }
      // kiểm tra roleId
      const roles = yield role_1.Role.find({}).select(
        "_id"
      );
      const extRoleIds = roles.map((r) => r.id);
      const roleIds = users.map((u) => u.roleId);
      if (roleIds.some((r) => !extRoleIds.includes(r))) {
        throw new bad_req_1.BadReqErr(
          "Không Tìm Thấy Vai Trò"
        );
      }
      // tạo nhiều user
      let flag = true;
      let userList = [];
      try {
        for (
          var _d = true,
            users_1 = __asyncValues(users),
            users_1_1;
          (users_1_1 = yield users_1.next()),
            (_a = users_1_1.done),
            !_a;

        ) {
          _c = users_1_1.value;
          _d = false;
          try {
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
            } = _c;
            try {
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
                role: roleId,
                hasAccess,
              });
              userList.push(user);
            } catch (err) {
              console.log(err);
              flag = false;
            }
          } finally {
            _d = true;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (!_d && !_a && (_b = users_1.return))
            yield _b.call(users_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      // tiến hành tạo lưu những user đã tạo
      if (flag) {
        userList.forEach((u) =>
          __awaiter(this, void 0, void 0, function* () {
            console.log(u);
            yield u.save();
          })
        );
      } else {
        throw new bad_req_1.BadReqErr(
          "Tạo Nhiều Người Dùng Thất Bại"
        );
      }
      res.status(201).json({
        message: "Tạo Thành Công",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}
exports.newManyUser = newManyUser;
