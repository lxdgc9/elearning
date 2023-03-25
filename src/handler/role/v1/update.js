const NotFoundErr = require("../../../error/not-found");
const Role = require("../../../model/role");

async function updateRole(req, res, next) {
  const { name, description, permissionIds } = req.body;

  try {
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        permissions: permissionIds,
      },
      { new: true }
    );
    if (!role) {
      throw new NotFoundErr("Không tìm thấy vai trò");
    }

    res.json({
      role,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = updateRole;
