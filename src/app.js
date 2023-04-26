const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const NotFoundErr = require("./error/not-found");
const errHandler = require("./middleware/err-handler");
const authRouter = require("./router/auth");
const provRouter = require("./router/province");
const classRouter = require("./router/class");
const channelRouter = require("./router/channel");
const groupRouter = require("./router/group");
const courseRouter = require("./router/course");
const gpermRouter = require("./router/gperm");
const permRouter = require("./router/perm");
const roleRouter = require("./router/role");
const subjectRouter = require("./router/subject");
const userRouter = require("./router/user");
const gameRouter = require("./router/game");
const testRouter = require("./router/test");
const cmtRouter = require("./router/comment");
const notiRouter = require("./router/noti");

const app = express();

app.use("/upload", express.static("upload"));

app.use(
  cors({
    origin: "https://e-learning-gd.netlify.app",
  })
);
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
app.use(groupRouter);
app.use(subjectRouter);
app.use(courseRouter);
app.use(testRouter);
app.use(gameRouter);
app.use(cmtRouter);
app.use(notiRouter);

app.all("*", (req, res) => {
  throw new NotFoundErr("Yêu cầu không tồn tại");
});

app.use(errHandler);

module.exports = app;
