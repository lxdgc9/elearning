import { NextFunction, Request, Response } from "express";
import { Role } from "../../models/role";

async function getRoles(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const roles = await Role.find({});

    res.json({
      roles,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getRoles };
