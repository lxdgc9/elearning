import { Router } from "express";
import { API } from "../cfg/route";
import { deleteSubject } from "../handler/subject/v1/delete";
import { getSubjects } from "../handler/subject/v1/get";
import { getSubject } from "../handler/subject/v1/get-by-id";
import { newSubject } from "../handler/subject/v1/new";
import { updateSubject } from "../handler/subject/v1/update";
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
    v1: getSubjects,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getSubject,
  })
);

r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  access(NEW.ACCESS),
  version({
    v1: newSubject,
  })
);

r[MOD.METHOD](
  MOD.PATH,
  currUser,
  requireAuth,
  access(MOD.ACCESS),
  version({
    v1: updateSubject,
  })
);

r[DEL.METHOD](
  DEL.PATH,
  currUser,
  requireAuth,
  access(DEL.ACCESS),
  version({
    v1: deleteSubject,
  })
);

export { r as subRouter };
