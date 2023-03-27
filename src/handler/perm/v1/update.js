import { BadReqErr } from "../../../err/bad-req";
import { GPerm } from "../../../model/gperm";
import { Perm } from "../../../model/perm";

async function updatePerm(req, res, next) {
  const { code, groupId, description } = req.body;

  try {
    const perm = await Perm.findById(req.params.id);
    if (!perm) {
      throw new BadReqErr("Quyền hạn không tồn tại");
    }

    const preGroup = perm.group;

    if (groupId && groupId !== preGroup) {
      await GPerm.findByIdAndUpdate(preGroup, {
        $pull: { permissions: perm.id },
      });
      await GPerm.findByIdAndUpdate(perm.group, {
        $addToSet: { permissions: perm.id },
      });
    }

    const permDetail = await Perm.findByIdAndUpdate(
      perm.id,
      {
        code,
        group: groupId,
        description,
      },
      { new: true }
    ).populate([
      {
        path: "group",
      },
    ]);

    res.json({
      permission: permDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updatePerm };
