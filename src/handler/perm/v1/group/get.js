import { NotFoundErr } from "../../../../err/not-found.js";
import { PermGr } from "../../../../model/perm-gr.js";

async function getPermGr(_req, res, next) {
  try {
    const permGr = await PermGr.find({}).populate([
      {
        path: "perms",
        select: "-group -roles",
      },
    ]);
    if (!permGr.length) {
      throw new NotFoundErr("Danh sách nhóm quyền trống");
    }

    res.json({
      group: permGr,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getPermGr };
