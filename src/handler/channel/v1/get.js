const Channel = require("../../../model/channel");
const NotFoundErr = require("../../../error/not-found");

async function getChannels(req, res, next) {
  try {
    const channels = await Channel.find({}).populate([
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
