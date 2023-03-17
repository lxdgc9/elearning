import { Router } from "express";
import { API } from "../cfg/route";
import { getUsers } from "../handler/user/get";
import { getUser } from "../handler/user/get-by-id";
import { me } from "../handler/user/me";
import { newUser } from "../handler/user/new";
import { updateProf } from "../handler/user/update-prof";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";

const r = Router();

const { GET, GET_BY_ID, NEW, CURR_USER, MOD_PROF } =
  API.USER;

r[CURR_USER.METHOD](
  CURR_USER.PATH,
  currUser,
  requireAuth,
  me
);

r[GET.METHOD](GET.PATH, getUsers);

r[GET_BY_ID.METHOD](GET_BY_ID.PATH, getUser);

r[MOD_PROF.METHOD](
  MOD_PROF.PATH,
  currUser,
  requireAuth,
  updateProf
);

r[NEW.METHOD](NEW.PATH, newUser);

export { r as userRouter };
