const { Role } = require("../../../model/role");

async function newRole(req, res, next) {
  const { name, description, permissionIds } = req.body;

  try {
    const role = Role.build({
      name,
      description,
      permissions: permissionIds,
    });
    await role.save();

    res.status(201).json({
      role,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { newRole };
