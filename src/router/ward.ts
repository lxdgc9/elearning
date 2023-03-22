import { Router } from "express";
import { API } from "../cfg/route";
import { getWards } from "../handler/ward/v1/get";
import { getWard } from "../handler/ward/v1/get-by-id";
import { access } from "../middleware/access";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { version } from "../middleware/version";
import { migrate } from "../migration/ward";

const r = Router();

const { GET, GET_BY_ID } = API.WARD;

migrate();

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  access(GET.ACCESS),
  version({
    v1: getWards,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getWard,
  })
);

export { r as wardRouter };
