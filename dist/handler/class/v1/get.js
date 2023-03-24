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
exports.getClasses = void 0;
const class_1 = require("../../../model/class");
function getClasses(_req, res, next) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const classes = yield class_1.Class.find({}).populate(
        [
          {
            path: "users",
            populate: [
              {
                path: "role",
                populate: [
                  {
                    path: "permissions",
                  },
                ],
              },
            ],
          },
        ]
      );
      res.json({
        classes,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}
exports.getClasses = getClasses;
