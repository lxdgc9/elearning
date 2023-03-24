const { Router } = require("express");
const { API } = require("../cfg/route");
const { deletePerm } = require("../handler/perm/v1/delete");
const { getPerms } = require("../handler/perm/v1/get");
const { getPerm } = require("../handler/perm/v1/get-by-id");
const { newPerm } = require("../handler/perm/v1/new");
const { updatePerm } = require("../handler/perm/v1/update");
const { access } = require("../middleware/access");
const { active } = require("../middleware/active");
const { currUser } = require("../middleware/current-user");
const {
  requireAuth,
} = require("../middleware/require-auth");
const { version } = require("../middleware/version");

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.PERM;

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
  access(NEW.ACCESS),
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

module.exports = {
  permRouter: r,
};
