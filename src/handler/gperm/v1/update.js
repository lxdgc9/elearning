const { NotFoundErr } = require("../../../error/not-found");
const { GPerm } = require("../../../model/gperm");

async function updateGPerm(req, res, next) {
  const { id } = req.params;
  const { name, permissionsIds } = req.body;

  try {
    const gperm = await GPerm.findByIdAndUpdate(
      id,
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

module.exports = { updateGPerm };
