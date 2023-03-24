"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.permRouter = void 0;
const express_1 = require("express");
const route_1 = require("../cfg/route");
const delete_1 = require("../handler/perm/v1/delete");
const get_1 = require("../handler/perm/v1/get");
const get_by_id_1 = require("../handler/perm/v1/get-by-id");
const new_1 = require("../handler/perm/v1/new");
const update_1 = require("../handler/perm/v1/update");
const access_1 = require("../middleware/access");
const active_1 = require("../middleware/active");
const current_user_1 = require("../middleware/current-user");
const require_auth_1 = require("../middleware/require-auth");
const version_1 = require("../middleware/version");
const r = (0, express_1.Router)();
exports.permRouter = r;
const { GET, GET_BY_ID, NEW, MOD, DEL } = route_1.API.PERM;
r[GET.METHOD](
  GET.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_1.access)(GET.ACCESS),
  (0, version_1.version)({
    v1: get_1.getPerms,
  })
);
r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_1.access)(GET_BY_ID.ACCESS),
  (0, version_1.version)({
    v1: get_by_id_1.getPerm,
  })
);
r[NEW.METHOD](
  NEW.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_1.access)(NEW.ACCESS),
  (0, version_1.version)({
    v1: new_1.newPerm,
  })
);
r[MOD.METHOD](
  MOD.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_1.access)(MOD.ACCESS),
  (0, version_1.version)({
    v1: update_1.updatePerm,
  })
);
r[DEL.METHOD](
  DEL.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_1.access)(DEL.ACCESS),
  (0, version_1.version)({
    v1: delete_1.deletePerm,
  })
);
