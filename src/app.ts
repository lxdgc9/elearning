import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errHandler } from "./middleware/error-handler";
import { authRouter } from "./router/auth";
import { gpermRouter } from "./router/gperm";
import { permRouter } from "./router/perm";
import { roleRouter } from "./router/role";
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

app.use(errHandler);

export { app };
