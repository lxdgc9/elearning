"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.provinRouter = void 0;
const express_1 = require("express");
const route_1 = require("../cfg/route");
const get_1 = require("../handler/province/v1/get");
const access_1 = require("../middleware/access");
const active_1 = require("../middleware/active");
const current_user_1 = require("../middleware/current-user");
const require_auth_1 = require("../middleware/require-auth");
const version_1 = require("../middleware/version");
const r = (0, express_1.Router)();
exports.provinRouter = r;
const { GET } = route_1.API.PROVINCE;
r[GET.METHOD](
  GET.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_1.access)(GET.ACCESS),
  (0, version_1.version)({
    v1: get_1.getProvinces,
  })
);
