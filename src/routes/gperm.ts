import { Router } from "express";
import { delGPerm } from "../handlers/gperm/delete";
import { getGPerms } from "../handlers/gperm/get";
import { getGPerm } from "../handlers/gperm/get-by-id";
import { newGPerm } from "../handlers/gperm/new";
import { updateGPerm } from "../handlers/gperm/update";
import { ROUTE_CFG } from "../route-cfg";

const r = Router();

const { GET, GET_BY_ID, NEW, UPDATE, DELETE } = ROUTE_CFG.API.GPERMS;

r[GET.METHOD](GET.PATH, getGPerms);

r[GET_BY_ID.METHOD](GET_BY_ID.PATH, getGPerm);

r[NEW.METHOD](NEW.PATH, newGPerm);

r[UPDATE.METHOD](UPDATE.PATH, updateGPerm);

r[DELETE.METHOD](DELETE.PATH, delGPerm);

export { r as gpermRouter };
