const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const { NotFoundErr } = require("./error/not-found");
const { errHandler } = require("./middleware/err-handler");
const { authRouter } = require("./router/auth");
const { classRouter } = require("./router/class");
const { courseRouter } = require("./router/course");
const { gpermRouter } = require("./router/gperm");
const { permRouter } = require("./router/perm");
const { provRouter } = require("./router/province");
const { roleRouter } = require("./router/role");
const { subjectRouter } = require("./router/subject");
const { userRouter } = require("./router/user");

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

app.all("*", (req, res) => {
  throw new NotFoundErr("Yêu cầu không tồn tại");
});

app.use(errHandler);

module.exports = { app };
