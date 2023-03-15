import { Router } from "express";
import { login } from "../handlers/auth/login";
import { ROUTE_CFG } from "../route-cfg";

const r = Router();

const { LOGIN } = ROUTE_CFG.API.AUTH;

r[LOGIN.METHOD](LOGIN.PATH, login);

export { r as authRouter };
