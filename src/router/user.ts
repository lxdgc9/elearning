import { Router } from "express";
import { API } from "../cfg/route";
import { getUsers } from "../handler/user/v1/get";
import { getUser } from "../handler/user/v1/get-by-id";
import { me } from "../handler/user/v1/me";
import { newUser } from "../handler/user/v1/new";
import { updateProf } from "../handler/user/v1/update-prof";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { version } from "../middleware/version";

const r = Router();

const { GET, GET_BY_ID, NEW, CURR_USER, MOD_PROF } =
  API.USER;

r[CURR_USER.METHOD](
  CURR_USER.PATH,
  currUser,
  requireAuth,
  version({
    v1: me,
  })
);

r[GET.METHOD](
  GET.PATH,
  version({
    v1: getUsers,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  version({
    v1: getUser,
  })
);

r[MOD_PROF.METHOD](
  MOD_PROF.PATH,
  currUser,
  requireAuth,
  version({
    v1: updateProf,
  })
);

r[NEW.METHOD](
  NEW.PATH,
  version({
    v1: newUser,
  })
);

export { r as userRouter };
