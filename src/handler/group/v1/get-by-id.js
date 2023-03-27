const NotFoundErr = require("../../../error/not-found");
const Group = require("../../../model/group");

async function getGroup(req, res, next) {
  try {
    const group = await Group.findById(
      req.params.id
    ).populate([
      {
        path: "owner",
      },
      {
        path: "channel",
      },
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
    if (!group) {
      throw new NotFoundErr("Không tìm thấy nhóm");
    }

    res.json({
      group,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getGroup;
