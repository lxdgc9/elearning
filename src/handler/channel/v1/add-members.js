const User = require("../../../model/user");
const Class = require("../../../model/class");
const BadReqErr = require("../../../error/bad-req");
const Channel = require("../../../model/channel");

async function addMembers(req, res, next) {
  const { memberIds } = req.body;

  try {
    const chann = await Channel.findByIdAndUpdate(
      req.params.channelId,
      {
        members: memberIds,
      },
      {
        new: true,
      }
    ).populate([
      {
        path: "owner",
      },
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
    if (!chann) {
      throw new BadReqErr("Không tồn tại kênh");
    }

    res.json({
      channel: chann,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = addMembers;
