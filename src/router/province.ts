import { Router } from "express";
import { API } from "../cfg/route";
import { getProvinces } from "../handler/province/v1/get";
import { getProvince } from "../handler/province/v1/get-by-id";
import { access } from "../middleware/access";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { version } from "../middleware/version";
import { migrate } from "../migration/province";

const r = Router();

const { GET, GET_BY_ID } = API.PROVINCE;

migrate();

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  access(GET.ACCESS),
  version({
    v1: getProvinces,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getProvince,
  })
);

export { r as provinRouter };
