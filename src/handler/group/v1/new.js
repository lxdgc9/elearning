const Channel = require("../../../model/channel");
const Group = require("../../../model/group");
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
        path: "channel",
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

    // Thông báo có group mới
    memberIds.forEach((m) => {
      socket.to(m).emit("new-group", groupDetail.id);
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
