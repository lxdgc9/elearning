import { Router } from "express";
import { delPerm } from "../handlers/perm/delete";
import { getPerms } from "../handlers/perm/get";
import { getPerm } from "../handlers/perm/get-by-id";
import { newPerm } from "../handlers/perm/new";
import { updatePerm } from "../handlers/perm/update";
import { ROUTE_CFG } from "../route-cfg";

const r = Router();

const { GET, GET_BY_ID, NEW, UPDATE, DELETE } = ROUTE_CFG.API.PERMS;

r[GET.METHOD](GET.PATH, getPerms);

r[GET_BY_ID.METHOD](GET_BY_ID.PATH, getPerm);

r[NEW.METHOD](NEW.PATH, newPerm);

r[UPDATE.METHOD](UPDATE.PATH, updatePerm);

r[DELETE.METHOD](DELETE.PATH, delPerm);

export { r as permRouter };
