import { Router } from "express";
import { API } from "../cfg/route";
import { deleteRole } from "../handler/role/v1/delete";
import { getRoles } from "../handler/role/v1/get";
import { getRole } from "../handler/role/v1/get-by-id";
import { newRole } from "../handler/role/v1/new";
import { updateRole } from "../handler/role/v1/update";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { version } from "../middleware/version";

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.ROLE;

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  version({
    v1: getRoles,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  version({
    v1: getRole,
  })
);

r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  version({
    v1: newRole,
  })
);

r[MOD.METHOD](
  MOD.PATH,
  currUser,
  requireAuth,
  version({
    v1: updateRole,
  })
);

r[DEL.METHOD](
  DEL.PATH,
  currUser,
  requireAuth,
  version({
    v1: deleteRole,
  })
);

export { r as roleRouter };
