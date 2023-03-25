const NotFoundErr = require("../../../error/not-found");
const GPerm = require("../../../model/gperm");

async function updateGPerm(req, res, next) {
  const { name, permissionsIds } = req.body;

  try {
    const gperm = await GPerm.findByIdAndUpdate(
      req.params.id,
      {
        name,
        permissions: permissionsIds,
      },
      { new: true }
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

module.exports = updateGPerm;
