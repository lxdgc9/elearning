const { Role } = require("../../../model/role");

async function deleteRole(req, res, next) {
  const { id } = req.params;

  try {
    const role = await Role.findByIdAndDelete(id);

    res.json({
      role,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { deleteRole };
