const NotFoundErr = require("../../../error/not-found");
const Group = require("../../../model/group");
const User = require("../../../model/user");

async function myGroup(req, res, next) {
  try {
    const user = await User.findById(req.user.id).populate([
      {
        path: "groups",
        populate: [
          {
            path: "owner",
          },
          {
            path: "channel",
            populate: [
              {
                path: "class",
              },
            ],
          },
          {
            path: "members",
            populate: [
              {
                path: "role",
              },
            ],
          },
        ],
      },
    ]);
    if (!user) {
      throw new NotFoundErr("Người dùng không tồn tại");
    }

    res.json({
      group: user.groups,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = myGroup;
