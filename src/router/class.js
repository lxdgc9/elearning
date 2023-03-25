const express = require("express");
const route = require("../cfg/route");
// Middlewares
const active = require("../middleware/active");
const access = require("../middleware/access");
const version = require("../middleware/version");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
// Routes
const getClasses = require("../handler/class/v1/get");
const getClass = require("../handler/class/v1/get-by-id");
const newClass = require("../handler/class/v1/new");
const allocUser = require("../handler/class/v1/alloc-user");
const removeUser = require("../handler/class/v1/remove-user");
const updateClass = require("../handler/class/v1/update");
const deleteClass = require("../handler/class/v1/delete");

const r = express.Router();

const {
  GET,
  GET_BY_ID,
  NEW,
  ALLOC_USER,
  REMOVE_USER,
  MOD,
  DEL,
} = route.API.CLASS;

// Lấy danh sách lớp
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

// Lấy thông tin chi tiết lớp
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

// Tạo mới lớp
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

// Phân bổ người dùng vào lớp
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

// Phân bổ người dùng ra khỏi lớp
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

// Cập nhật thông tin lớp
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

module.exports = r;
