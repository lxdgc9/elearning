const Channel = require("../../../model/channel");
const NotFoundErr = require("../../../error/not-found");

async function getChannel(req, res, next) {
  try {
    const channel = await Channel.findById(
      req.params.id
    ).populate([
      {
        path: "members",
        populate: [
          {
            path: "role",
            select: "name description",
          },
        ],
      },
    ]);
    if (!channel) {
      throw new NotFoundErr("Không tìm thấy kênh");
    }

    res.json({
      channel,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getChannel;
