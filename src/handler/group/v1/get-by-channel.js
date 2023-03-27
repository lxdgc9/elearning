const Class = require("../../../model/class");
const BadReqErr = require("../../../error/bad-req");
const Group = require("../../../model/group");
const Channel = require("../../../model/channel");

async function getByChannel(req, res, next) {
  try {
    const channel = await Channel.findById(
      req.params.channelId
    )
      .select("channels")
      .populate([
        {
          path: "channels",
        },
      ]);
    if (!channel) {
      throw new BadReqErr("Lớp học không tồn tại");
    }

    res.json({
      channel,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getByChannel;
