import { NotFoundErr } from "../../../err/not-found";
import { Perm } from "../../../model/perm";

async function getPerms(_req, res, next) {
  try {
    const perms = await Perm.find({})
      .populate([
        {
          path: "group",
        },
      ])
      .sort({ createdAt: -1 });
    if (!perms.length) {
      throw new NotFoundErr("Danh sách quyền hạn trống");
    }

    res.json({
      permissions: perms,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getPerms };
