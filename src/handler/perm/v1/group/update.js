import { BadReqErr } from "../../../../err/bad-req";
import { GPerm } from "../../../../model/gperm";

async function updateGPerm(req, res, next) {
  const { name, permissionsIds } = req.body;

  try {
    const gPerm = await GPerm.findByIdAndUpdate(
      req.params.id,
      {
        name,
        permissions: permissionsIds,
      },
      { new: true }
    ).populate([
      {
        path: "permissions",
      },
    ]);
    if (!gPerm) {
      throw new BadReqErr("Nhóm quyền không hợp lệ");
    }

    res.json({
      groupPermission: gPerm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updateGPerm };
