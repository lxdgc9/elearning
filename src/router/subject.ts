import { Router } from "express";
import { API } from "../cfg/route";
import { delSub } from "../handler/subject/v1/delete";
import { getSubs } from "../handler/subject/v1/get";
import { getSub } from "../handler/subject/v1/get-by-id";
import { newSub } from "../handler/subject/v1/new";
import { updateSub } from "../handler/subject/v1/update";
import { access } from "../middleware/access";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { version } from "../middleware/version";

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.SUBJECT;

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  access(GET.ACCESS),
  version({
    v1: getSubs,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getSub,
  })
);

r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  access(NEW.ACCESS),
  version({
    v1: newSub,
  })
);

r[MOD.METHOD](
  MOD.PATH,
  currUser,
  requireAuth,
  access(MOD.ACCESS),
  version({
    v1: updateSub,
  })
);

r[DEL.METHOD](
  DEL.PATH,
  currUser,
  requireAuth,
  access(DEL.ACCESS),
  version({
    v1: delSub,
  })
);

export { r as subRouter };
