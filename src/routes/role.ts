import { Router } from "express";
import { newRole } from "../handlers/role/new";
import { ROUTE_CFG } from "../route-cfg";

const r = Router();

const { GET_ROLES, GET_ROLE_BY_ID, NEW_ROLE } = ROUTE_CFG.API.ROLES;

r[GET_ROLES.METHOD](GET_ROLES.PATH, (req, res) => {
  res.send("Get Roles");
});

r[GET_ROLE_BY_ID.METHOD](GET_ROLE_BY_ID.PATH, (req, res) => {
  res.send("Get Role By Id");
});

r[NEW_ROLE.METHOD](NEW_ROLE.PATH, newRole);

export { r as roleRouter };
