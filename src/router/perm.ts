import { Router } from "express";
import { API } from "../cfg/route";
import { delPerm } from "../handler/perm/delete";
import { getPerms } from "../handler/perm/get";
import { getPerm } from "../handler/perm/get-by-id";
import { newPerm } from "../handler/perm/new";
import { updatePerm } from "../handler/perm/update";
import { access } from "../middleware/access";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.PERM;

r[GET.METHOD](GET.PATH, currUser, requireAuth, access(GET.ACCESS), getPerms);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  access(GET_BY_ID.ACCESS),
  getPerm
);

r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  access(GET_BY_ID.ACCESS),
  newPerm
);

r[MOD.METHOD](MOD.PATH, updatePerm);

r[DEL.METHOD](DEL.PATH, delPerm);

export { r as permRouter };
