const Class = require("../../../model/class");
const BadReqErr = require("../../../error/bad-req");

async function getByChannel(req, res, next) {
  try {
    const _class = await Class.findById(req.params.classId)
      .select("channels")
      .populate([
        {
          path: "channels",
        },
      ]);
    if (!_class) {
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
