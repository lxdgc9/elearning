const { Router } = require("express");
const { API } = require("../cfg/route");
const { deleteRole } = require("../handler/role/v1/delete");
const { getRoles } = require("../handler/role/v1/get");
const { getRole } = require("../handler/role/v1/get-by-id");
const { newRole } = require("../handler/role/v1/new");
const { updateRole } = require("../handler/role/v1/update");
const { active } = require("../middleware/active");
const { currUser } = require("../middleware/current-user");
const {
  requireAuth,
} = require("../middleware/require-auth");
const { version } = require("../middleware/version");

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.ROLE;

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: getRoles,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: getRole,
  })
);

r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: newRole,
  })
);

r[MOD.METHOD](
  MOD.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: updateRole,
  })
);

r[DEL.METHOD](
  DEL.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: deleteRole,
  })
);

module.exports = {
  roleRouter: r,
};
