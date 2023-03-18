import cors from "cors";
import express from "express";
import helmet from "helmet";
import { NotFoundErr } from "./error/not-found";
import { errHandler } from "./middleware/err-handler";
import { authRouter } from "./router/auth";
import { gpermRouter } from "./router/gperm";
import { permRouter } from "./router/perm";
import { roleRouter } from "./router/role";
import { subRouter } from "./router/subject";
import { userRouter } from "./router/user";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// API
app.use(authRouter);
app.use(userRouter);
app.use(roleRouter);
app.use(permRouter);
app.use(gpermRouter);
app.use(subRouter);

// Catch unknown request
app.all("*", (_req, _res) => {
  throw new NotFoundErr("REQ_NOT_FOUND");
});

app.use(errHandler);

export { app };
