import { Router } from "express";
import { Action } from "../@types/action";
import { deleteRole } from "../handlers/role/delete";
import { getRoles } from "../handlers/role/get";
import { getRole } from "../handlers/role/get-by-id";
import { newRole } from "../handlers/role/new";
import { updateRole } from "../handlers/role/update";
import { log } from "../middlewares/log";
import { ROUTE_CFG } from "../route-cfg";

const r = Router();

const { GET, GET_BY_ID, NEW, UPDATE, DELETE } = ROUTE_CFG.API.ROLES;
const { WRITE } = Action;

r[GET.METHOD](GET.PATH, getRoles);

r[GET_BY_ID.METHOD](GET_BY_ID.PATH, getRole);

r[NEW.METHOD](NEW.PATH, log(WRITE), newRole);

r[UPDATE.METHOD](UPDATE.PATH, updateRole);

r[DELETE.METHOD](DELETE.PATH, deleteRole);

export { r as roleRouter };
