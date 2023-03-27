const Class = require("../../../model/class");
const BadReqErr = require("../../../error/bad-req");

async function deleteClass(req, res, next) {
  try {
    const _class = await Class.findByIdAndDelete(
      req.params.id
    );
    if (!_class) {
      throw new BadReqErr("Không tồn tại lớp học");
    }

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = deleteClass;
