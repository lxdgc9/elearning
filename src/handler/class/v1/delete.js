const Class = require("../../../model/class");
const BadReqErr = require("../../../error/bad-req");
const User = require("../../../model/user");

async function deleteClass(req, res, next) {
  try {
    const _class = await Class.findByIdAndDelete(
      req.params.id
    );
    if (!_class) {
      throw new BadReqErr("Lớp học không tồn tại");
    }

    // Sau khi xóa thành công lớp học, tiến hành xóa lớp
    // trực thuộc này ra khỏi những thành viên
    for await (const u of _class.members) {
      await User.findByIdAndUpdate(u.id, {
        $pull: {
          classes: _class.id,
        },
      });
    }

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = deleteClass;
