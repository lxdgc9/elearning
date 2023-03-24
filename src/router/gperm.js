const { Router } = require("express");
const { API } = require("../cfg/route");
const {
  deleteGPerm,
} = require("../handler/gperm/v1/delete");
const { getGPerms } = require("../handler/gperm/v1/get");
const {
  getGPerm,
} = require("../handler/gperm/v1/get-by-id");
const { newGPerm } = require("../handler/gperm/v1/new");
const {
  updateGPerm,
} = require("../handler/gperm/v1/update");
const { active } = require("../middleware/active");
const { currUser } = require("../middleware/current-user");
const {
  requireAuth,
} = require("../middleware/require-auth");
const { version } = require("../middleware/version");

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.GPERM;

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: getGPerms,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: getGPerm,
  })
);

r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: newGPerm,
  })
);

r[MOD.METHOD](
  MOD.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: updateGPerm,
  })
);

r[DEL.METHOD](
  DEL.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: deleteGPerm,
  })
);

module.exports = {
  gpermRouter: r,
};
