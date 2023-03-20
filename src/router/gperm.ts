import { Router } from "express";
import { API } from "../cfg/route";
import { deleteGPerm } from "../handler/gperm/v1/delete";
import { getGPerms } from "../handler/gperm/v1/get";
import { getGPerm } from "../handler/gperm/v1/get-by-id";
import { newGPerm } from "../handler/gperm/v1/new";
import { updateGPerm } from "../handler/gperm/v1/update";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { version } from "../middleware/version";

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.GPERM;

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  version({
    v1: getGPerms,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  version({
    v1: getGPerm,
  })
);

r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  version({
    v1: newGPerm,
  })
);

r[MOD.METHOD](
  MOD.PATH,
  currUser,
  requireAuth,
  version({
    v1: updateGPerm,
  })
);

r[DEL.METHOD](
  DEL.PATH,
  currUser,
  requireAuth,
  version({
    v1: deleteGPerm,
  })
);

export { r as gpermRouter };
