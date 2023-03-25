const { GPerm } = require("../../../model/gperm");

async function newGPerm(req, res, next) {
  const { name } = req.body;

  try {
    const gperm = GPerm.build({
      name,
    });
    await gperm.save();

    res.status(201).json({
      groupPermission: gperm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { newGPerm };
