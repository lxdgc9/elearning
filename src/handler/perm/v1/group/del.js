import { BadReqErr } from "../../../../err/bad-req.js";
import { PermGr } from "../../../../model/perm-gr.js";
import { Perm } from "../../../../model/perm.js";

async function delPermGr(req, res, next) {
  try {
    const permGr = await PermGr.findByIdAndDelete(
      req.params.id
    );
    if (!permGr) {
      throw new BadReqErr("Nhóm quyền không tồn tại");
    }

    for await (const p of permGr.perms) {
      await Perm.findByIdAndUpdate(p, {
        $unset: {
          group: 1,
        },
      });
    }

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { delPermGr };
