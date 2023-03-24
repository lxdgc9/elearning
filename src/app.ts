import cors from "cors";
import express from "express";
import helmet from "helmet";
import { NotFoundErr } from "./error/not-found";
import { errHandler } from "./middleware/err-handler";
import { authRouter } from "./router/auth";
import { classRouter } from "./router/class";
import { courseRouter } from "./router/course";
import { gpermRouter } from "./router/gperm";
import { permRouter } from "./router/perm";
import { provinRouter } from "./router/province";
import { roleRouter } from "./router/role";
import { subjectRouter } from "./router/subject";
import { userRouter } from "./router/user";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(roleRouter);
app.use(permRouter);
app.use(gpermRouter);
app.use(classRouter);
app.use(subjectRouter);
app.use(courseRouter);
app.use(provinRouter);

app.all("*", (_req, _res) => {
  throw new NotFoundErr("Yêu Cầu Không Tồn Tại");
});

app.use(errHandler);

export { app };
