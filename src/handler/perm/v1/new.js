import { BadReqErr } from "../../../err/bad-req";
import { GPerm } from "../../../model/gperm";
import { Perm } from "../../../model/perm";

async function newPerm(req, res, next) {
  const { code, groupId, description } = req.body;

  try {
    const gPerm = await GPerm.findById(groupId);
    if (!gPerm) {
      throw new BadReqErr("Nhóm quyền không tồn tại");
    }

    const perm = new Perm({
      code,
      description,
      group: groupId,
    });
    await perm.save();

    await gPerm.updateOne({
      $addToSet: {
        permissions: perm.id,
      },
    });

    const permDetail = await Perm.findById(
      perm.id
    ).populate([
      {
        path: "group",
      },
    ]);

    res.status(201).json({
      permission: permDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newPerm };
