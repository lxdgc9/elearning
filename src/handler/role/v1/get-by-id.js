const { NotFoundErr } = require("../../../error/not-found");
const { Role } = require("../../../model/role");

async function getRole(req, res, next) {
  const { id } = req.params;

  try {
    const role = await Role.findById(id).populate([
      {
        path: "permissions",
      },
    ]);
    if (!role) {
      throw new NotFoundErr("Không tìm thấy quyền hạn");
    }

    res.json({
      role,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { getRole };
