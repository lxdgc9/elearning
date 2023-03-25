const { NotFoundErr } = require("../../../error/not-found");
const { Perm } = require("../../../model/perm");

async function getPerms(req, res, next) {
  try {
    const perms = await Perm.find({});
    if (!perms.length) {
      throw new NotFoundErr("Danh Sách Quyền Hạn Trống");
    }

    res.json({
      permissions: perms,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { getPerms };
