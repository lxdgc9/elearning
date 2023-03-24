"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.classRouter = void 0;
const express_1 = require("express");
const route_1 = require("../cfg/route");
const alloc_user_1 = require("../handler/class/v1/alloc-user");
const remove_user_1 = require("../handler/class/v1/remove-user");
const delete_1 = require("../handler/class/v1/delete");
const get_1 = require("../handler/class/v1/get");
const get_by_id_1 = require("../handler/class/v1/get-by-id");
const new_1 = require("../handler/class/v1/new");
const update_1 = require("../handler/class/v1/update");
const access_1 = require("../middleware/access");
const current_user_1 = require("../middleware/current-user");
const require_auth_1 = require("../middleware/require-auth");
const version_1 = require("../middleware/version");
const active_1 = require("../middleware/active");
const r = (0, express_1.Router)();
exports.classRouter = r;
const {
  GET,
  GET_BY_ID,
  NEW,
  ALLOC_USER,
  REMOVE_USER,
  MOD,
  DEL,
} = route_1.API.CLASS;
r[GET.METHOD](
  GET.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_1.access)(GET.ACCESS),
  (0, version_1.version)({
    v1: get_1.getClasses,
  })
);
r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_1.access)(GET_BY_ID.ACCESS),
  (0, version_1.version)({
    v1: get_by_id_1.getClass,
  })
);
r[NEW.METHOD](
  NEW.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_1.access)(NEW.ACCESS),
  (0, version_1.version)({
    v1: new_1.newClass,
  })
);
r[ALLOC_USER.METHOD](
  ALLOC_USER.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_1.access)(ALLOC_USER.ACCESS),
  (0, version_1.version)({
    v1: alloc_user_1.allocUser,
  })
);
r[REMOVE_USER.METHOD](
  REMOVE_USER.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_1.access)(ALLOC_USER.ACCESS),
  (0, version_1.version)({
    v1: remove_user_1.removeUser,
  })
);
r[MOD.METHOD](
  MOD.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_1.access)(MOD.ACCESS),
  (0, version_1.version)({
    v1: update_1.updateClass,
  })
);
r[DEL.METHOD](
  DEL.PATH,
  current_user_1.currUser,
  require_auth_1.requireAuth,
  active_1.active,
  (0, access_1.access)(DEL.ACCESS),
  (0, version_1.version)({
    v1: delete_1.deleteClass,
  })
);
