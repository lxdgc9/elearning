const BadReqErr = require("../../../error/bad-req");
const Group = require("../../../model/group");

async function markSeen(req, res, next) {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          unread: req.user.id,
        },
      }
    ).populate([
      {
        path: "owner",
      },
      {
        path: "messages",
        populate: [
          {
            path: "sender",
          },
        ],
      },
      {
        path: "channel",
        populate: [
          {
            path: "class",
          },
        ],
      },
      {
        path: "members",
        populate: [
          {
            path: "role",
          },
        ],
      },
    ]);
    if (!group) {
      throw new BadReqErr("Nhóm không tồn tại");
    }

    res.json({
      group,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = markSeen;
