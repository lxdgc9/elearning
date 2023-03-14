import { Router } from "express";
import { ROUTE_CFG } from "../route-cfg";

const r = Router();

const { GET_USERS, GET_USER_BY_ID } = ROUTE_CFG.API.USERS;

r[GET_USERS.METHOD](GET_USERS.PATH, (req, res) => {
  res.send("Hello World");
});

r[GET_USER_BY_ID.METHOD](GET_USER_BY_ID.PATH, (req, res) => {
  res.send("djsakdajskldasjdlkajdalksjdl");
});

export { r as userRouter };
