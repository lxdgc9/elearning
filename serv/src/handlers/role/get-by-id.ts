import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { Role } from "../../models/role";

async function getRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  try {
    const role = await Role.findById(id);
    if (!role) {
      throw new NotFoundError("Role Not Found");
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
