const BadReqErr = require("../../../error/bad-req");
const NotFoundErr = require("../../../error/not-found");
const Group = require("../../../model/group");

async function getGroup(req, res, next) {
  try {
    const group = await Group.findById(
      req.params.id
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
      throw new NotFoundErr("Không tìm thấy nhóm");
    }

    if (
      !group.members.map((m) => m._id).includes(req.user.id)
    ) {
      throw new BadReqErr(
        "Bạn không phải là thành viên của nhóm này"
      );
    }

    res.json({
      group,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getGroup;
