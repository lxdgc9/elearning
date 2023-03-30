import { NotFoundErr } from "../../../err/not-found.js";
import { Perm } from "../../../model/perm.js";

async function getPerms(_req, res, next) {
  try {
    const perms = await Perm.find({})
      .populate([
        {
          path: "group",
          select: "-perms",
        },
        {
          path: "roles",
          select: "-perms -users",
          options: {
            sort: {
              createdAt: -1,
            },
          },
        },
      ])
      .sort({
        _id: -1,
      });
    if (!perms.length) {
      throw new NotFoundErr("Danh sách quyền hạn trống");
    }

    res.json({
      perms,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getPerms };
