const { BadReqErr } = require("../../../error/bad-req");
const { NotFoundErr } = require("../../../error/not-found");
const { Class } = require("../../../model/class");
const { User } = require("../../../model/user");

async function removeUser(req, res, next) {
  const { id } = req.params;
  const { userIds } = req.body;

  try {
    const users = await User.find({
      _id: { $in: userIds },
    });
    if (users.length !== userIds.length) {
      throw new BadReqErr(
        "Danh sách người dùng không hợp lệ"
      );
    }

    const _class = await Class.findById(id);
    if (!_class) {
      throw new NotFoundErr("Lớp học không hợp lệ");
    }

    await _class.updateOne({
      $pullAll: {
        users: users.map((u) => u.id),
      },
    });

    users.forEach(async (u) => {
      await User.findByIdAndUpdate(u.id, {
        $pull: {
          classes: _class.id,
        },
      });
    });

    res.json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { removeUser };
