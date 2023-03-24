const { Router } = require("express");
const { API } = require("../cfg/route");
const {
  allocUser,
} = require("../handler/class/v1/alloc-user");
const {
  deleteClass,
} = require("../handler/class/v1/delete");
const { getClasses } = require("../handler/class/v1/get");
const {
  getClass,
} = require("../handler/class/v1/get-by-id");
const { newClass } = require("../handler/class/v1/new");
const {
  removeUser,
} = require("../handler/class/v1/remove-user");
const {
  updateClass,
} = require("../handler/class/v1/update");
const { access } = require("../middleware/access");
const { active } = require("../middleware/active");
const { currUser } = require("../middleware/current-user");
const {
  requireAuth,
} = require("../middleware/require-auth");
const { version } = require("../middleware/version");

const r = Router();

const {
  GET,
  GET_BY_ID,
  NEW,
  ALLOC_USER,
  REMOVE_USER,
  MOD,
  DEL,
} = API.CLASS;

// lấy danh sách lớp
r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  active,
  access(GET.ACCESS),
  version({
    v1: getClasses,
  })
);

// lấy thông tin chi tiết lớp
r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  active,
  access(GET_BY_ID.ACCESS),
  version({
    v1: getClass,
  })
);

// tạo mới lớp
r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  active,
  access(NEW.ACCESS),
  version({
    v1: newClass,
  })
);

// phân bổ người dùng vào lớp
r[ALLOC_USER.METHOD](
  ALLOC_USER.PATH,
  currUser,
  requireAuth,
  active,
  access(ALLOC_USER.ACCESS),
  version({
    v1: allocUser,
  })
);

// phân bổ người dùng ra khỏi lớp
r[REMOVE_USER.METHOD](
  REMOVE_USER.PATH,
  currUser,
  requireAuth,
  active,
  access(ALLOC_USER.ACCESS),
  version({
    v1: removeUser,
  })
);

// cập nhật thông tin lớp
r[MOD.METHOD](
  MOD.PATH,
  currUser,
  requireAuth,
  active,
  access(MOD.ACCESS),
  version({
    v1: updateClass,
  })
);

// xóa lớp
r[DEL.METHOD](
  DEL.PATH,
  currUser,
  requireAuth,
  active,
  access(DEL.ACCESS),
  version({
    v1: deleteClass,
  })
);

module.exports = {
  classRouter: r,
};
