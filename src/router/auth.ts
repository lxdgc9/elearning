import { Router } from "express";
import { API } from "../cfg/route";
import { login } from "../handler/auth/login";

const r = Router();

const { LOGIN } = API.AUTH;

r[LOGIN.METHOD](LOGIN.PATH, login);

export { r as authRouter };
