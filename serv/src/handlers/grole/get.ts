import { NextFunction, Request, Response } from "express";
import { GRole } from "../../models/group-role";

async function getGRoles(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const groles = await GRole.find({});

    res.json({
      groupRoles: groles,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getGRoles };
