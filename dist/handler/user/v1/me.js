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
exports.me = void 0;
const user_1 = require("../../../model/user");
function me(req, res, next) {
  return __awaiter(this, void 0, void 0, function* () {
    const { id } = req.user;
    try {
      const user = yield user_1.User.findById(id)
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
      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}
exports.me = me;
