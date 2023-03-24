import { Router } from "express";
import { API } from "../cfg/route";
import { getProvinces } from "../handler/province/v1/get";
import { access } from "../middleware/access";
import { active } from "../middleware/active";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { version } from "../middleware/version";

const r = Router();

const { GET } = API.PROVINCE;

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  active,
  access(GET.ACCESS),
  version({
    v1: getProvinces,
  })
);

export { r as provinRouter };
