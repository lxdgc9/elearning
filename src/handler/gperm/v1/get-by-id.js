const NotFoundErr = require("../../../error/not-found");
const GPerm = require("../../../model/gperm");

async function getGPerm(req, res, next) {
  try {
    const gperm = await GPerm.findById(
      req.params.id
    ).populate([
      {
        path: "permissions",
      },
    ]);
    if (!gperm) {
      throw new NotFoundErr("Không tìm thấy nhóm quyền");
    }

    res.json({
      groupPermission: gperm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getGPerm;
