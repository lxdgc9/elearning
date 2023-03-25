const { NotFoundErr } = require("../../../error/not-found");
const { GPerm } = require("../../../model/gperm");
const { Perm } = require("../../../model/perm");

async function updatePerm(req, res, next) {
  const { id } = req.params;
  const { name, groupId, description } = req.body;

  try {
    const perm = await Perm.findById(id);
    if (!perm) {
      throw new NotFoundErr("Không tìm thấy quyền");
    }

    // Remove permission =require( previous group,
    // and add permission to new group
    if (groupId && groupId !== perm.groupId) {
      await GPerm.findByIdAndUpdate(perm.groupId, {
        $pull: { permissions: perm.id },
      });
      await GPerm.findByIdAndUpdate(groupId, {
        $addToSet: { permissions: perm.id },
      });
    }

    await perm.updateOne({
      name,
      groupId,
      description,
    });

    res.json({
      permission: perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { updatePerm };
