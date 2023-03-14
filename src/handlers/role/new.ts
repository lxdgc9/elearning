import { NextFunction, Request, Response } from "express";
import { Role } from "../../models/role";

type NewRoleDto = {
  name: string;
  description?: string;
};

async function newRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name, description }: NewRoleDto = req.body;
  console.log(req.body);

  try {
    const role = Role.build({
      name,
      description,
    });
    role.save();

    res.status(201).json({
      role,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newRole };
