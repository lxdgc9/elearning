const NotFoundErr = require("../../../error/not-found");
const Class = require("../../../model/class");

async function deleteClass(req, res, next) {
  try {
    const _class = await Class.findByIdAndDelete(
      req.params.id
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

module.exports = deleteClass;
