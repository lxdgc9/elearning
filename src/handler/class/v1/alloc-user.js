const { BadReqErr } = require("../../../error/bad-req");
const { NotFoundErr } = require("../../../error/not-found");
const { Class } = require("../../../model/class");
const { User } = require("../../../model/user");

async function allocUser(req, res, next) {
  const { id } = req.params;
  const { userIds } = req.body;

  try {
    const users = await User.find({
      _id: { $in: userIds },
    });
    if (users.length !== userIds.length) {
      throw new BadReqErr("INVALID_USER_IDS");
    }

    const _class = await Class.findById(id);
    if (!_class) {
      throw new NotFoundErr("CLASS_NOT_FOUND");
    }

    await _class.updateOne({
      $addToSet: {
        users: users.map((u) => u.id),
      },
    });

    users.forEach(async (u) => {
      await User.findByIdAndUpdate(u.id, {
        $addToSet: {
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

module.exports = { allocUser };
