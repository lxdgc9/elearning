const { Router } = require("express");
const { API } = require("../cfg/route");
const {
  deleteSubject,
} = require("../handler/subject/v1/delete");
const {
  getSubjects,
} = require("../handler/subject/v1/get");
const {
  getSubject,
} = require("../handler/subject/v1/get-by-id");
const { newSubject } = require("../handler/subject/v1/new");
const {
  updateSubject,
} = require("../handler/subject/v1/update");
const { access } = require("../middleware/access");
const { active } = require("../middleware/active");
const { currUser } = require("../middleware/current-user");
const {
  requireAuth,
} = require("../middleware/require-auth");
const { version } = require("../middleware/version");

const r = Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = API.SUBJECT;

r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  active,
  access(GET.ACCESS),
  version({
    v1: getSubjects,
  })
);

r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  active,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getSubject,
  })
);

r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  active,
  access(NEW.ACCESS),
  version({
    v1: newSubject,
  })
);

r[MOD.METHOD](
  MOD.PATH,
  currUser,
  requireAuth,
  active,
  access(MOD.ACCESS),
  version({
    v1: updateSubject,
  })
);

r[DEL.METHOD](
  DEL.PATH,
  currUser,
  requireAuth,
  active,
  access(DEL.ACCESS),
  version({
    v1: deleteSubject,
  })
);

module.exports = {
  subjectRouter: r,
};
