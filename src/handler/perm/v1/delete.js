import { BadReqErr } from "../../../err/bad-req";
import { GPerm } from "../../../model/gperm";
import { Perm } from "../../../model/perm";

async function deletePerm(req, res, next) {
  try {
    const perm = await Perm.findByIdAndDelete(
      req.params.id
    );
    if (!perm) {
      throw new BadReqErr("Quyền hạn không tồn tại");
    }

    await GPerm.findByIdAndUpdate(perm.group, {
      $pull: {
        permissions: perm.id,
      },
    });

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { deletePerm };
