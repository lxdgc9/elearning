const NotFoundErr = require("../../../error/not-found");
const Class = require("../../../model/class");

async function getClasses(_req, res, next) {
  try {
    const classes = await Class.find({}).populate([
      {
        path: "users",
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
    if (!classes.length) {
      throw new NotFoundErr("Danh sách lớp học trống");
    }

    res.json({
      classes,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getClasses;
