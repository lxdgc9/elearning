import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { GPerm } from "../../../model/gperm";
import { Perm } from "../../../model/perm";

type NewPermDto = {
  name: string;
  groupId: Types.ObjectId;
  description?: string;
};

async function newPerm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, groupId, description }: NewPermDto =
    req.body;

  try {
    const perm = Perm.build({
      name,
      groupId,
      description,
    });
    await perm.save();

    // thêm 'permission' vào 'group'
    await GPerm.findByIdAndUpdate(groupId, {
      $addToSet: {
        permissions: perm.id,
      },
    });

    res.status(201).json({
      permission: perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newPerm };
