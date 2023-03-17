import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Role } from "../../models/role";

type NewRoleDto = {
  name: string;
  description?: string;
  permissionIds?: Types.ObjectId[];
};

async function newRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name, description, permissionIds }: NewRoleDto = req.body;

  try {
    const role = Role.build({
      name,
      description,
      permissions: permissionIds,
    });
    await role.save();

    res.status(201).json({
      role,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newRole };
