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
exports.updateRole = void 0;
const not_found_1 = require("../../../error/not-found");
const role_1 = require("../../../model/role");
function updateRole(req, res, next) {
  return __awaiter(this, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, permissionIds } = req.body;
    try {
      const role = yield role_1.Role.findByIdAndUpdate(
        id,
        {
          name,
          description,
          permissions: permissionIds,
        },
        { new: true }
      );
      if (!role) {
        throw new not_found_1.NotFoundErr("ROLE_NOT_FOUND");
      }
      res.json({
        role,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
}
exports.updateRole = updateRole;
