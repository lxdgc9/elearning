import { NextFunction, Request, Response } from "express";
import { Role } from "../../../model/role";

async function getRoles(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const roles = await Role.find({}).populate([
      {
        path: "permissions",
      },
    ]);

    res.json({
      roles,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getRoles };
