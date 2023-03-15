import { Router } from "express";
import { delGRole } from "../handlers/grole/delete";
import { getGRoles } from "../handlers/grole/get";
import { getGRole } from "../handlers/grole/get-by-id";
import { newGRole } from "../handlers/grole/new";
import { updateGRole } from "../handlers/grole/update";
import { ROUTE_CFG } from "../route-cfg";

const r = Router();

const { GET, GET_BY_ID, NEW, UPDATE, DELETE } = ROUTE_CFG.API.GROLE;

r[GET.METHOD](GET.PATH, getGRoles);

r[GET_BY_ID.METHOD](GET_BY_ID.PATH, getGRole);

r[NEW.METHOD](NEW.PATH, newGRole);

r[UPDATE.METHOD](UPDATE.PATH, updateGRole);

r[DELETE.METHOD](DELETE.PATH, delGRole);

export { r as groleRouter };
