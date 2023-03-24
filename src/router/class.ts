import { Router } from "express";
import { API } from "../cfg/route";
import { allocUser } from "../handler/class/v1/alloc-user";
import { deleteClass } from "../handler/class/v1/delete";
import { getClasses } from "../handler/class/v1/get";
import { getClass } from "../handler/class/v1/get-by-id";
import { newClass } from "../handler/class/v1/new";
import { removeUser } from "../handler/class/v1/remove-user";
import { updateClass } from "../handler/class/v1/update";
import { access } from "../middleware/access";
import { active } from "../middleware/active";
import { currUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";
import { version } from "../middleware/version";

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

export { r as classRouter };
