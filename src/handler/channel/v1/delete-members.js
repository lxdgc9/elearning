const User = require("../../../model/user");
const Class = require("../../../model/class");
const BadReqErr = require("../../../error/bad-req");

async function deleteMembers(req, res, next) {
  const { memberIds } = req.body;

  try {
    // Tiến hành cập nhật lớp học, cập nhật thành viên
    // trong lớp
    const _class = await Class.findByIdAndUpdate(
      req.params.id,
      {
        $pullAll: memberIds,
      },
      {
        new: true,
      }
    );
    if (!_class) {
      throw new BadReqErr("Không tồn tại lớp học");
    }

    // Sau khi xóa thành viên ra khỏi lớp học, tiến hành
    // xóa lớp trực thuộc ra khỏi thông tin người dùng
    for await (const m of memberIds) {
      await User.findByIdAndUpdate(m.id, {
        $pull: {
          classes: _class.id,
        },
      });
    }

    res.json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = deleteMembers;
