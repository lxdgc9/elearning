import cors from "cors";
import express from "express";
import helmet from "helmet";

import { NotFoundErr } from "./err/not-found.js";
import { errHandler } from "./middleware/err-handler.js";
import { authRouter } from "./router/auth.js";
import { classRouter } from "./router/class.js";
import { permRouter } from "./router/perm.js";
import { roleRouter } from "./router/role.js";
import { userRouter } from "./router/user.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(roleRouter);
app.use(permRouter);
app.use(classRouter);

app.all("*", (_req, _res) => {
  throw new NotFoundErr("Yêu cầu không tồn tại");
});

app.use(errHandler);

export { app };
