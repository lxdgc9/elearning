const NotFoundErr = require("../../../error/not-found");
const Group = require("../../../model/group");

async function getGroups(req, res, next) {
  try {
    const groups = await Group.find({}).populate([
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
    if (!groups.length) {
      throw new NotFoundErr("Danh sách nhóm trống");
    }

    res.json({
      groups,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getGroups;
