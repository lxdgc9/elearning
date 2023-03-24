const { NotFoundErr } = require("../../../error/not-found");
const { Class } = require("../../../model/class");

async function deleteClass(req, res, next) {
  const { id } = req.params;

  try {
    const _class = await Class.findByIdAndDelete(id);
    if (!_class) {
      throw new NotFoundErr("CLASS_NOT_FOUND");
    }

    res.json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { deleteClass };
