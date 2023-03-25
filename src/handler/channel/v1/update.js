const Class = require("../../../model/class");
const BadReqErr = require("../../../error/bad-req");

async function updateClass(req, res, next) {
  const { name, session, description } = req.body;

  try {
    const _class = await Class.findByIdAndUpdate(
      req.params.id,
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
      throw new BadReqErr("Không tồn tại lớp học");
    }

    res.json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = updateClass;
