import { Router } from "express";
import { API } from "../cfg/route";
import { delGPerm } from "../handler/gperm/delete";
import { getGPerms } from "../handler/gperm/get";
import { getGPerm } from "../handler/gperm/get-by-id";
import { newGPerm } from "../handler/gperm/new";
import { updateGPerm } from "../handler/gperm/update";

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.GPERM;

r[GET.METHOD](GET.PATH, getGPerms);

r[GET_BY_ID.METHOD](GET_BY_ID.PATH, getGPerm);

r[NEW.METHOD](NEW.PATH, newGPerm);

r[MOD.METHOD](MOD.PATH, updateGPerm);

r[DEL.METHOD](DEL.PATH, delGPerm);

export { r as gpermRouter };
