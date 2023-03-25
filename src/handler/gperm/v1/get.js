const GPerm = require("../../../model/gperm");

async function getGPerms(req, res, next) {
  try {
    const gperms = await GPerm.find({}).populate([
      {
        path: "permissions",
      },
    ]);

    res.json({
      groupPermissions: gperms,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getGPerms;
