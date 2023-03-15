import cors from "cors";
import express from "express";
import helmet from "helmet";
import { roleRouter } from "./routes/role";
import { userRouter } from "./routes/user";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// API
app.use(userRouter);
app.use(roleRouter);

export { app };
