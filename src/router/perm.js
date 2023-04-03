const express = require("express");
const route = require("../cfg/route");
// Middlewares
const active = require("../middleware/active");
const access = require("../middleware/access");
const version = require("../middleware/version");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
// Routes
const getPerms = require("../handler/perm/v1/get");
const getPerm = require("../handler/perm/v1/get-by-id");
const newPerm = require("../handler/perm/v1/new");
const updatePerm = require("../handler/perm/v1/update");
const deletePerm = require("../handler/perm/v1/delete");

const r = express.Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = route.API.PERM;

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  active,
  access(GET.ACCESS),
  version({
    v1: getPerms,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  active,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getPerm,
  })
);

r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: newPerm,
  })
);

r[MOD.METHOD](
  MOD.PATH,
  currUser,
  requireAuth,
  active,
  access(MOD.ACCESS),
  version({
    v1: updatePerm,
  })
);

r[DEL.METHOD](
  DEL.PATH,
  currUser,
  requireAuth,
  active,
  access(DEL.ACCESS),
  version({
    v1: deletePerm,
  })
);

module.exports = r;
