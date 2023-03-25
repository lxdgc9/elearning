const NotFoundErr = require("../../../error/not-found");
const GPerm = require("../../../model/gperm");
const Perm = require("../../../model/perm");

async function deletePerm(req, res, next) {
  try {
    const perm = await Perm.findByIdAndDelete(
      req.params.id
    );
    if (!perm) {
      throw new NotFoundErr("Không Tìm Thấy Quyền");
    }

    // khi xóa thành công 'permission',
    // tiến hành xóa 'permission' khỏi 'group permission'
    await GPerm.findByIdAndUpdate(perm.groupId, {
      $pull: { permissions: perm.id },
    });

    res.json({
      permission: perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = deletePerm;
