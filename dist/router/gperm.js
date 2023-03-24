"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.gpermRouter = void 0;
const express_1 = require("express");
const route_1 = require("../cfg/route");
const delete_1 = require("../handler/gperm/v1/delete");
const get_1 = require("../handler/gperm/v1/get");
const get_by_id_1 = require("../handler/gperm/v1/get-by-id");
const new_1 = require("../handler/gperm/v1/new");
const update_1 = require("../handler/gperm/v1/update");
const active_1 = require("../middleware/active");
const current_user_1 = require("../middleware/current-user");
const require_auth_1 = require("../middleware/require-auth");
const version_1 = require("../middleware/version");
const r = (0, express_1.Router)();
exports.gpermRouter = r;
const { GET, GET_BY_ID, NEW, MOD, DEL } = route_1.API.GPERM;
r[GET.METHOD](
  GET.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, version_1.version)({
    v1: get_1.getGPerms,
  })
);
r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, version_1.version)({
    v1: get_by_id_1.getGPerm,
  })
);
r[NEW.METHOD](
  NEW.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, version_1.version)({
    v1: new_1.newGPerm,
  })
);
r[MOD.METHOD](
  MOD.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, version_1.version)({
    v1: update_1.updateGPerm,
  })
);
r[DEL.METHOD](
  DEL.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, version_1.version)({
    v1: delete_1.deleteGPerm,
  })
);
