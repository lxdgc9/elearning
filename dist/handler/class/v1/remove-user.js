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
exports.removeUser = void 0;
const bad_req_1 = require("../../../error/bad-req");
const not_found_1 = require("../../../error/not-found");
const class_1 = require("../../../model/class");
const user_1 = require("../../../model/user");
function removeUser(req, res, next) {
  return __awaiter(this, void 0, void 0, function* () {
    const { id } = req.params;
    const { userIds } = req.body;
    try {
      const users = yield user_1.User.find({
        _id: { $in: userIds },
      });
      if (users.length !== userIds.length) {
        throw new bad_req_1.BadReqErr("INVALID_USER_IDS");
      }
      const _class = yield class_1.Class.findById(id);
      if (!_class) {
        throw new not_found_1.NotFoundErr(
          "CLASS_NOT_FOUND"
        );
      }
      yield _class.updateOne({
        $pullAll: {
          users: users.map((u) => u.id),
        },
      });
      users.forEach((u) =>
        __awaiter(this, void 0, void 0, function* () {
          yield user_1.User.findByIdAndUpdate(u.id, {
            $pull: {
              classes: _class.id,
            },
          });
        })
      );
      res.json({
        class: _class,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}
exports.removeUser = removeUser;
