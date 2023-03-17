import { Router } from "express";
import { API } from "../cfg/route";
import { delGPerm } from "../handler/gperm/v1/delete";
import { getGPerms } from "../handler/gperm/v1/get";
import { getGPerm } from "../handler/gperm/v1/get-by-id";
import { newGPerm } from "../handler/gperm/v1/new";
import { updateGPerm } from "../handler/gperm/v1/update";
import { version } from "../middleware/version";

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.GPERM;

r[GET.METHOD](
  GET.PATH,
  version({
    v1: getGPerms,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  version({
    v1: getGPerm,
  })
);

r[NEW.METHOD](
  NEW.PATH,
  version({
    v1: newGPerm,
  })
);

r[MOD.METHOD](
  MOD.PATH,
  version({
    v1: updateGPerm,
  })
);

r[DEL.METHOD](
  DEL.PATH,
  version({
    v1: delGPerm,
  })
);

export { r as gpermRouter };
