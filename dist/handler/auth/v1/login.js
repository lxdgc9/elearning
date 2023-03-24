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
exports.login = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const bad_req_1 = require("../../../error/bad-req");
const password_1 = require("../../../helper/password");
const user_1 = require("../../../model/user");
function login(req, res, next) {
  return __awaiter(this, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
      // kiểm tra username
      const user = yield user_1.User.findOne({
        username,
      })
        .select("-logs")
        .populate([
          {
            path: "role",
            select: "permissions",
            populate: [
              {
                path: "permissions",
                select: "name description",
              },
            ],
          },
          {
            path: "classes",
            select: "name session description",
          },
        ]);
      if (!user) {
        throw new bad_req_1.BadReqErr(
          "Tài Khoản Không Tồn Tại"
        );
      }
      // kiểm tra password
      const isMatch = yield password_1.Password.compare(
        user.password,
        password
      );
      if (!isMatch) {
        throw new bad_req_1.BadReqErr("Sai Mật Khẩu");
      }
      // tạo token
      const payload = {
        id: user.id,
        perms: user.role.permissions.map((p) => p.name),
        hasAccess: user.hasAccess,
      };
      const accessToken = (0, jsonwebtoken_1.sign)(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "3d", // Ttl
        }
      );
      res.json({
        accessToken,
        user: user,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}
exports.login = login;
