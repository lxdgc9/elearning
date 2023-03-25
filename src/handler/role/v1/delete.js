const Role = require("../../../model/role");

async function deleteRole(req, res, next) {
  try {
    const role = await Role.findByIdAndDelete(
      req.params.id
    );

    res.json({
      role,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = deleteRole;
