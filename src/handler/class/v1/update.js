import { BadReqErr } from "../../../err/bad-req.js";
import { Class } from "../../../model/class.js";

async function updateClass(req, res, next) {
  const { name, session, description } = req.body;

  try {
    const _class = await Class.findByIdAndUpdate(
      req.params.id,
      {
        name,
        session,
        description,
      },
      {
        new: true,
      }
    ).populate([
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
      throw new BadReqErr("Lớp học không tồn tại");
    }

    res.json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updateClass };
