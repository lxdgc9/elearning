import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../errors/not-found";
import { Role } from "../../models/role";

async function getRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  try {
    const role = await Role.findById(id).populate([
      {
        path: "permissions",
      },
    ]);
    if (!role) {
      throw new NotFoundErr("Role Not Found");
    }

    res.json({
      role,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getRole };
