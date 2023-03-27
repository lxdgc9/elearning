const Class = require("../../../model/class");
const NotFoundErr = require("../../../error/not-found");

async function getClass(req, res, next) {
  try {
    const _class = await Class.findById(
      req.params.id
    ).populate([
      {
        path: "channels",
        populate: [
          {
            path: "groups",
            populate: [
              {
                path: "owner",
              },
              {
                path: "channel",
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
          {
            path: "owner",
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
    ]);
    if (!_class) {
      throw new NotFoundErr("Không tìm thấy lớp học");
    }

    res.json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getClass;
