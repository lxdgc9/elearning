const { BadReqErr } = require("../../../error/bad-req");
const { NotFoundErr } = require("../../../error/not-found");
const { Role } = require("../../../model/role");
const { User } = require("../../../model/user");

async function setRole(req, res, next) {
  const { userIds, roleId } = req.body;

  try {
    // kiểm tra userIds
    const extUsers = await User.find({
      _id: { $in: userIds },
    });
    if (extUsers.length > 0) {
      throw new BadReqErr("Người dùng không hợp lệ");
    }

    // kiểm tra roleId
    const role = await Role.findById(roleId);
    if (!role) {
      throw new NotFoundErr("Vai trò không hợp lệ");
    }

    // cập nhật role cho users
    for await (const u of userIds) {
    }
    userIds.forEach(async (u) => {
      await User.findByIdAndUpdate(u, {
        role: roleId,
      });
    });

    res.json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { setRole };
