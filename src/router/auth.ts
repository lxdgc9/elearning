import { Router } from "express";
import { API } from "../cfg/route";
import { login } from "../handler/auth/v1/login";
import { version } from "../middleware/version";

const r = Router();

const { LOGIN } = API.AUTH;

r[LOGIN.METHOD](
  LOGIN.PATH,
  version({
    v1: login,
  })
);

export { r as authRouter };
