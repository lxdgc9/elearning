"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const not_found_1 = require("./error/not-found");
const err_handler_1 = require("./middleware/err-handler");
const auth_1 = require("./router/auth");
const class_1 = require("./router/class");
const course_1 = require("./router/course");
const gperm_1 = require("./router/gperm");
const perm_1 = require("./router/perm");
const province_1 = require("./router/province");
const role_1 = require("./router/role");
const subject_1 = require("./router/subject");
const user_1 = require("./router/user");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(auth_1.authRouter);
app.use(user_1.userRouter);
app.use(role_1.roleRouter);
app.use(perm_1.permRouter);
app.use(gperm_1.gpermRouter);
app.use(class_1.classRouter);
app.use(subject_1.subjectRouter);
app.use(course_1.courseRouter);
app.use(province_1.provinRouter);
app.all("*", (_req, _res) => {
  throw new not_found_1.NotFoundErr(
    "Yêu Cầu Không Tồn Tại"
  );
});
app.use(err_handler_1.errHandler);
