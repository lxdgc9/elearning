const { Role } = require("../../../model/role");

async function getRoles(req, res, next) {
  try {
    const roles = await Role.find({}).populate([
      {
        path: "permissions",
      },
    ]);

    res.json({
      roles,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { getRoles };
