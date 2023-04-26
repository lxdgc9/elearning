const { Router } = require("express");
const delNoti = require("../handler/noti/del");
const getNotis = require("../handler/noti/get");
const newNoti = require("../handler/noti/new");
const seenNoti = require("../handler/noti/seen");
const active = require("../middleware/active");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
const access = require("../middleware/access");

const r = Router();

r.get(
  "/api/notifications",
  currUser,
  requireAuth,
  active,
  access(),
  getNotis
);

r.post(
  "/api/notifications",
  currUser,
  requireAuth,
  active,
  access(),
  newNoti
);

r.patch(
  "/api/notifications/seen/:id",
  currUser,
  requireAuth,
  active,
  access(),
  seenNoti
);

r.delete(
  "/api/notifications/:id",
  currUser,
  requireAuth,
  active,
  access(),
  delNoti
);

module.exports = r;
