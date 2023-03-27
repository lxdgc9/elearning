import { NotFoundErr } from "../../../err/not-found.js";
import { Class } from "../../../model/class.js";

async function getClass(req, res, next) {
  try {
    const _class = await Class.findById(
      req.params.id
    ).populate([
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

export { getClass };
