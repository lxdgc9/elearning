import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { NotFoundErr } from "../../error/not-found";
import { GPerm } from "../../model/gperm";
import { Perm } from "../../model/perm";

type UpdatePermDto = {
  name?: string;
  groupId?: Types.ObjectId;
  description?: string;
};

async function updatePerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const { name, groupId, description }: UpdatePermDto = req.body;

  try {
    const perm = await Perm.findById(id);
    if (!perm) {
      throw new NotFoundErr("PERMISSION_NOT_FOUND");
    }

    // Remove permission from previous group,
    // and add permission to new group
    if (groupId && groupId !== perm.groupId) {
      await GPerm.findByIdAndUpdate(perm.groupId, {
        $pull: { permissions: perm.id },
      });
      await GPerm.findByIdAndUpdate(groupId, {
        $addToSet: { permissions: perm.id },
      });
    }

    // Update this permission
    await perm.updateOne({
      name,
      groupId,
      description,
    });

    res.json({
      permission: perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updatePerm };
