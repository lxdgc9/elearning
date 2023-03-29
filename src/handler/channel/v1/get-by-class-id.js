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
          ],
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

module.exports = getByClass;
