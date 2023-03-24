const { Class } = require("../../../model/class");

async function newClass(req, res, next) {
  const { name, session, description } = req.body;

  try {
    const _class = Class.build({
      name,
      session,
      description,
    });
    await _class.save();

    res.status(201).json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { newClass };
