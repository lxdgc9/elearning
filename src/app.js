import cors from "cors";
import express from "express";
import helmet from "helmet";

import { NotFoundErr } from "./err/not-found";
import { errHandler } from "./middleware/err-handler";
import { authRouter } from "./router/auth";
import { permRouter } from "./router/perm";
import { roleRouter } from "./router/role";
import { userRouter } from "./router/user";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(roleRouter);
app.use(permRouter);

app.all("*", (_req, _res) => {
  throw new NotFoundErr("Yêu cầu không tồn tại");
});

app.use(errHandler);

export { app };
