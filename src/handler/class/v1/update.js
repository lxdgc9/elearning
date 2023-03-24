const { NotFoundErr } = require("../../../error/not-found");
const { Class } = require("../../../model/class");

async function updateClass(req, res, next) {
  const { id } = req.params;
  const { name, session, description } = req.body;

  try {
    const _class = await Class.findByIdAndUpdate(
      id,
      {
        name,
        session,
        description,
      },
      {
        new: true,
      }
    );
    if (!_class) {
      throw new NotFoundErr("Không tìm thấy lớp học");
    }

    res.json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { updateClass };
