import { BadReqErr } from "../../../err/bad-req.js";
import { PermGr } from "../../../model/perm-gr.js";
import { Perm } from "../../../model/perm.js";

async function delPerm(req, res, next) {
  try {
    const perm = await Perm.findByIdAndDelete(
      req.params.id
    );
    if (!perm) {
      throw new BadReqErr("Quyền hạn không tồn tại");
    }

    await PermGr.findByIdAndUpdate(perm.group, {
      $pull: {
        perms: perm._id,
      },
    });

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { delPerm };
