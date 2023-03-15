import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { GRole } from "../../models/group-role";

type NewRoleDto = {
  name: string;
  roleIds?: Types.ObjectId[];
};

async function newGRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name, roleIds }: NewRoleDto = req.body;

  try {
    const grole = GRole.build({
      name,
      roles: roleIds,
    });
    grole.save();

    res.status(201).json({
      groupRole: grole,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newGRole };
