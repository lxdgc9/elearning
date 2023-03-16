import { Router } from "express";
import { getUsers } from "../handlers/user/get";
import { getUser } from "../handlers/user/get-by-id";
import { me } from "../handlers/user/me";
import { newUser } from "../handlers/user/new";
import { currUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { ROUTE_CFG } from "../route-cfg";

const r = Router();

const { GET, GET_BY_ID, NEW, CURR_USER } = ROUTE_CFG.API.USERS;

r[CURR_USER.METHOD](CURR_USER.PATH, currUser, requireAuth, me);

r[GET.METHOD](GET.PATH, getUsers);

r[GET_BY_ID.METHOD](GET_BY_ID.PATH, getUser);

r[GET_BY_ID.METHOD](GET_BY_ID.PATH, (req, res) => {
  res.send("djsakdajskldasjdlkajdalksjdl");
});

r[NEW.METHOD](NEW.PATH, newUser);

export { r as userRouter };
