const User = require("../../../model/user");
const Class = require("../../../model/class");
const BadReqErr = require("../../../err/bad-req").default;

async function deleteMembers(req, res, next) {
  const { memberIds } = req.body;

  try {
    // Tiến hành cập nhật lớp học, cập nhật thành viên
    // trong lớp
    const _class = await Class.findByIdAndUpdate(
      req.params.id,
      {
        $pullAll: {
          members: memberIds,
        },
      },
      {
        new: true,
      }
    ).populate([
      {
        path: "members",
        select: "profile role",
        populate: [
          {
            path: "role",
            populate: [
              {
                path: "permissions",
                select: "name description",
              },
            ],
          },
        ],
      },
    ]);
    if (!_class) {
      throw new BadReqErr("Lớp học không tồn tại");
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
