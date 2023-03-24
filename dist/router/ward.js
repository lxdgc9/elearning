"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.wardRouter = void 0;
const express_1 = require("express");
const route_1 = require("../cfg/route");
const get_1 = require("../handler/ward/v1/get");
const get_by_id_1 = require("../handler/ward/v1/get-by-id");
const access_1 = require("../middleware/access");
const current_user_1 = require("../middleware/current-user");
const require_auth_1 = require("../middleware/require-auth");
const version_1 = require("../middleware/version");
const ward_1 = require("../migration/ward");
const r = (0, express_1.Router)();
exports.wardRouter = r;
const { GET, GET_BY_ID } = route_1.API.WARD;
(0, ward_1.migrate)();
r[GET.METHOD](
  GET.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  (0, access_1.access)(GET.ACCESS),
  (0, version_1.version)({
    v1: get_1.getWards,
  })
);
r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  (0, access_1.access)(GET_BY_ID.ACCESS),
  (0, version_1.version)({
    v1: get_by_id_1.getWard,
  })
);
