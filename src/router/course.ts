import { Router } from "express";
import { API } from "../cfg/route";
import { deleteCourse } from "../handler/course/v1/delete";
import { getCourses } from "../handler/course/v1/get";
import { getCourse } from "../handler/course/v1/get-by-id";
import { newCourse } from "../handler/course/v1/new";
import { updateCourse } from "../handler/course/v1/update";
import { access } from "../middleware/access";
import { active } from "../middleware/active";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { version } from "../middleware/version";

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

export { r as courseRouter };
