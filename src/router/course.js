const { Router } = require("express");
const { API } = require("../cfg/route");
const {
  deleteCourse,
} = require("../handler/course/v1/delete");
const { getCourses } = require("../handler/course/v1/get");
const {
  getCourse,
} = require("../handler/course/v1/get-by-id");
const { newCourse } = require("../handler/course/v1/new");
const {
  updateCourse,
} = require("../handler/course/v1/update");
const { access } = require("../middleware/access");
const { active } = require("../middleware/active");
const { currUser } = require("../middleware/current-user");
const {
  requireAuth,
} = require("../middleware/require-auth");
const { version } = require("../middleware/version");

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.COURSE;

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

module.exports = {
  courseRouter: r,
};
