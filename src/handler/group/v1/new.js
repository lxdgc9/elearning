const Channel = require("../../../model/channel");
const BadReqErr = require("../../../error/bad-req");
const Group = require("../../../model/group");

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

    // Lấy thông tin chi tiết kênh đã tạo trả về client
    const groupDetail = await Channel.findById(
      group.id
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

    res.status(201).json({
      group: groupDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = newGroup;
