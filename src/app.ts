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
import { provRouter } from "./router/province";
import { roleRouter } from "./router/role";
import { subjectRouter } from "./router/subject";
import { userRouter } from "./router/user";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(authRouter); // xác thực
app.use(provRouter); // danh mục hành chính
app.use(userRouter); // người dùng
app.use(roleRouter); // vai trò
app.use(permRouter); // quyền hạn
app.use(gpermRouter); // nhóm quyền
app.use(classRouter); // lớp học
app.use(subjectRouter); // môn học
app.use(courseRouter); // khóa học

app.all("*", (_req, _res) => {
  throw new NotFoundErr("Yêu cầu không tồn tại");
});

app.use(errHandler);

export { app };
