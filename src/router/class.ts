import { Router } from "express";
import { API } from "../cfg/route";
import { delClass } from "../handler/class/v1/delete";
import { getClasses } from "../handler/class/v1/get";
import { getClass } from "../handler/class/v1/get-by-id";
import { newClass } from "../handler/class/v1/new";
import { updateClass } from "../handler/class/v1/update";
import { access } from "../middleware/access";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { version } from "../middleware/version";

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.CLASS;

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  access(GET.ACCESS),
  version({
    v1: getClasses,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getClass,
  })
);

r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  access(NEW.ACCESS),
  version({
    v1: newClass,
  })
);

r[MOD.METHOD](
  MOD.PATH,
  currUser,
  requireAuth,
  access(MOD.ACCESS),
  version({
    v1: updateClass,
  })
);

r[DEL.METHOD](
  DEL.PATH,
  currUser,
  requireAuth,
  access(DEL.ACCESS),
  version({
    v1: delClass,
  })
);

export { r as classRouter };
