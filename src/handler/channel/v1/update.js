const Channel = require("../../../model/channel");
const BadReqErr = require("../../../error/bad-req");

async function updateClass(req, res, next) {
  const { name, session, description, memberIds } =
    req.body;

  try {
    const chann = await Channel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        session,
        description,
        members: memberIds,
      },
      {
        new: true,
      }
    ).populate([
      {
        path: "owner",
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
    if (!chann) {
      throw new BadReqErr("Không tồn tại kênh");
    }

    res.json({
      channel: chann,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = updateClass;
