const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
// Errors
const NotFoundErr = require("./error/not-found");
// Middlewares
const errHandler = require("./middleware/err-handler");
// Routes
const authRouter = require("./router/auth");
const classRouter = require("./router/class");
const channelRouter = require("./router/channel");
const courseRouter = require("./router/course");
const gpermRouter = require("./router/gperm");
const permRouter = require("./router/perm");
const provRouter = require("./router/province");
const roleRouter = require("./router/role");
const subjectRouter = require("./router/subject");
const userRouter = require("./router/user");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(authRouter);
app.use(provRouter);
app.use(userRouter);
app.use(roleRouter);
app.use(permRouter);
app.use(gpermRouter);
app.use(classRouter);
app.use(channelRouter);
app.use(subjectRouter);
app.use(courseRouter);

app.all("*", (req, res) => {
  throw new NotFoundErr("Yêu cầu không tồn tại");
});

app.use(errHandler);

module.exports = app;
