const express = require("express");
const route = require("../cfg/route");

const active = require("../middleware/active");
const access = require("../middleware/access");
const version = require("../middleware/version");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");

const getCourses = require("../handler/course/v1/get");
const getCourse = require("../handler/course/v1/get-by-id");
const newCourse = require("../handler/course/v1/new");
const updateCourse = require("../handler/course/v1/update");
const deleteCourse = require("../handler/course/v1/delete");
const uploader = require("../helper/uploader");
const rate = require("../handler/rating/rate");
const complete = require("../handler/course/v1/complete");

const r = express.Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = route.API.COURSE;

// Lấy danh sách khóa học
r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  active,
  access(GET.ACCESS),
  version({
    v1: getCourses,
  })
);

// Lấy thông tin chi tiết khóa học
r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  active,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getCourse,
  })
);

// Tạo khóa học
r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  active,
  access(NEW.ACCESS),
  uploader.any(),
  version({
    v1: newCourse,
  })
);

r.patch(
  "/api/courses/lesson-completed/:lessonId",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: complete,
  })
);

r.patch(
  "/api/course/rating/:courseId",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: rate,
  })
);

// Cập nhật khóa học
r.patch(
  "/api/courses/:id",
  currUser,
  requireAuth,
  active,
  access(),
  uploader.any(),
  version({
    v1: updateCourse,
  })
);

// Xóa khóa học
r.delete(
  "/api/courses/:id",
  currUser,
  requireAuth,
  active,
  access(DEL.ACCESS),
  version({
    v1: deleteCourse,
  })
);

module.exports = r;
