import { Router } from "express";
import { API } from "../cfg/route";
import { getDistricts } from "../handler/district/v1/get";
import { getDistrict } from "../handler/district/v1/get-by-id";
import { access } from "../middleware/access";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { version } from "../middleware/version";
import { migrate } from "../migration/district";

const r = Router();

const { GET, GET_BY_ID } = API.DISTRICT;

migrate();

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  access(GET.ACCESS),
  version({
    v1: getDistricts,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getDistrict,
  })
);

export { r as districtRouter };
