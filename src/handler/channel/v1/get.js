const Channel = require("../../../model/channel");
const NotFoundErr = require("../../../error/not-found");

async function getChannels(req, res, next) {
  try {
    const channels = await Channel.find({}).populate([
      {
        path: "owner",
      },
      {
        path: "class",
      },
      {
        path: "groups",
        populate: [
          {
            path: "members",
          },
          {
            path: "messages",
          },
        ],
      },
      {
        path: "members",
        populate: [
          {
            path: "role",
            populate: [
              {
                path: "permissions",
              },
            ],
          },
        ],
      },
    ]);
    if (!channels.length) {
      throw new NotFoundErr("Danh sách kênh trống");
    }

    res.json({
      channels,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getChannels;
