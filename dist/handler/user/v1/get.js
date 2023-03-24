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
exports.getUsers = void 0;
const not_found_1 = require("../../../error/not-found");
const user_1 = require("../../../model/user");
function getUsers(req, res, next) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const users = yield user_1.User.find({})
        .select("-logs -classes")
        .populate([
          {
            path: "role",
            select: "name description",
          },
        ])
        .sort({ createdAt: -1 });
      if (!users.length) {
        throw new not_found_1.NotFoundErr(
          "Danh Sách Người Dùng Trống"
        );
      }
      res.json({
        users,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}
exports.getUsers = getUsers;
