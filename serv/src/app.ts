import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error-handler";
import { authRouter } from "./routes/auth";
import { permRouter } from "./routes/perm";
import { roleRouter } from "./routes/role";
import { userRouter } from "./routes/user";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// API
app.use(authRouter);
app.use(userRouter);
app.use(roleRouter);
app.use(permRouter);

app.use(errorHandler);

export { app };
