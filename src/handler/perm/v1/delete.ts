import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { GPerm } from "../../../model/gperm";
import { Perm } from "../../../model/perm";

async function deletePerm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const perm = await Perm.findByIdAndDelete(id);
    if (!perm) {
      throw new NotFoundErr("Không Tìm Thấy Quyền");
    }

    // khi xóa thành công 'permission',
    // tiến hành xóa 'permission' khỏi 'group permission'
    await GPerm.findByIdAndUpdate(perm.groupId, {
      $pull: { permissions: perm.id },
    });

    res.json({
      permission: perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { deletePerm };
