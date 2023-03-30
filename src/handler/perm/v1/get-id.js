import { NotFoundErr } from "../../../err/not-found.js";
import { Perm } from "../../../model/perm.js";

async function getPerm(req, res, next) {
  try {
    const perm = await Perm.findById(
      req.params.id
    ).populate([
      {
        path: "group",
        select: "-perms",
      },
      {
        path: "roles",
      },
    ]);
    if (!perm) {
      throw new NotFoundErr("Không tìm thấy quyền hạn");
    }

    res.json({
      perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getPerm };
