const NotFoundErr = require("../../../error/not-found");
const Class = require("../../../model/class");

async function getClasses(req, res, next) {
  try {
    const classes = await Class.find({}).populate([
      {
        path: "members",
        populate: [
          {
            path: "role",
            select: "name description",
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
