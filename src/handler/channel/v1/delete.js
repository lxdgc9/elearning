const Class = require("../../../model/class");
const BadReqErr = require("../../../error/bad-req");
const Channel = require("../../../model/channel");

async function deleteChannel(req, res, next) {
  try {
    const chann = await Channel.findByIdAndDelete(
      req.params.id
    );
    if (!chann) {
      throw new BadReqErr("Không tồn tại kênh");
    }

    await Class.findByIdAndUpdate(chann.class, {
      $pull: {
        channels: chann.id,
      },
    });

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = deleteChannel;
