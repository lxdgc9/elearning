import { Router } from "express";
import { API } from "../cfg/route";
import { deletePerm } from "../handler/perm/v1/delete";
import { getPerms } from "../handler/perm/v1/get";
import { getPerm } from "../handler/perm/v1/get-by-id";
import { newPerm } from "../handler/perm/v1/new";
import { updatePerm } from "../handler/perm/v1/update";
import { access } from "../middleware/access";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { version } from "../middleware/version";

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.PERM;

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  access(GET.ACCESS),
  version({
    v1: getPerms,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getPerm,
  })
);

r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  access(NEW.ACCESS),
  version({
    v1: newPerm,
  })
);

r[MOD.METHOD](
  MOD.PATH,
  currUser,
  requireAuth,
  access(MOD.ACCESS),
  version({
    v1: updatePerm,
  })
);

r[DEL.METHOD](
  DEL.PATH,
  currUser,
  requireAuth,
  access(DEL.ACCESS),
  version({
    v1: deletePerm,
  })
);

export { r as permRouter };
