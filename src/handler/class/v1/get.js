import { NotFoundErr } from "../../../err/not-found.js";
import { Class } from "../../../model/class.js";

async function getClasses(_req, res, next) {
  try {
    const classes = await Class.find({}).populate([
      {
        path: "channels",
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

export { getClasses };
