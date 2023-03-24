import { Router } from "express";
import { API } from "../cfg/route";
import { getProvinces } from "../handler/province/v1/get";
import { version } from "../middleware/version";

const r = Router();

const { GET } = API.PROVINCE;

r[GET.METHOD](
  GET.PATH,
  version({
    v1: getProvinces,
  })
);

export { r as provinRouter };
