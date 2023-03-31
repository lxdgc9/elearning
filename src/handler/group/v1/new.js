const Channel = require("../../../model/channel");
const Group = require("../../../model/group");
const User = require("../../../model/user");
const { getIO } = require("../../../sock");

async function newGroup(req, res, next) {
  let { name, channelId, description, memberIds } =
    req.body;

  try {
    const group = Group.build({
      name,
      owner: req.user.id,
      channel: channelId,
      description,
      members: memberIds,
    });
    await group.save();

    for await (const m of group.members) {
      await User.findByIdAndUpdate(m, {
        $addToSet: {
          groups: group.id,
        },
      });
    }

    await Channel.findByIdAndUpdate(channelId, {
      $addToSet: {
        groups: group.id,
      },
    });

    // Lấy thông tin chi tiết nhóm đã tạo trả về client
    const groupDetail = await Group.findById(
      group.id
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

    // Thông báo có group mới
    memberIds.forEach((m) => {
      getIO().to(m).emit("new-group", groupDetail);
    });

    res.status(201).json({
      group: groupDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = newGroup;
