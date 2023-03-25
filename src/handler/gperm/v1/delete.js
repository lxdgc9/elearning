const NotFoundErr = require("../../../error/not-found");
const GPerm = require("../../../model/gperm");

async function deleteGPerm(req, res, next) {
  try {
    const gperm = await GPerm.findByIdAndDelete(
      req.params.id
    );
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

module.exports = deleteGPerm;
