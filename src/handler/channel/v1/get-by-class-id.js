const Class = require("../../../model/class");
const BadReqErr = require("../../../error/bad-req");

async function getByClass(req, res, next) {
  try {
    const _class = await Class.findById(req.params.classId)
      .select("channels")
      .populate([
        {
          path: "channels",
          populate: [
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
            },
          ],
        },
      ]);
    if (!_class) {
      throw new BadReqErr("Lớp học không tồn tại");
    }

    res.json({
      channels: _class.channels,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getByClass;
