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
  version({
    v1: newCourse,
  })
);

// Cập nhật khóa học
r[MOD.METHOD](
  MOD.PATH,
  currUser,
  requireAuth,
  active,
  access(MOD.ACCESS),
  version({
    v1: updateCourse,
  })
);

// Xóa khóa học
r[DEL.METHOD](
  DEL.PATH,
  currUser,
  requireAuth,
  active,
  access(DEL.ACCESS),
  version({
    v1: deleteCourse,
  })
);

module.exports = r;
