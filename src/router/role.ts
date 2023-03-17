import { Router } from "express";
import { API } from "../cfg/route";
import { delRole } from "../handler/role/delete";
import { getRoles } from "../handler/role/get";
import { getRole } from "../handler/role/get-by-id";
import { newRole } from "../handler/role/new";
import { updateRole } from "../handler/role/update";

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.ROLE;

r[GET.METHOD](GET.PATH, getRoles);

r[GET_BY_ID.METHOD](GET_BY_ID.PATH, getRole);

r[NEW.METHOD](NEW.PATH, newRole);

r[MOD.METHOD](MOD.PATH, updateRole);

r[DEL.METHOD](DEL.PATH, delRole);

export { r as roleRouter };
