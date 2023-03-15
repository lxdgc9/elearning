import { NextFunction, Request, Response } from "express";
import { GRole } from "../../models/group-role";

async function delGRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  try {
    const role = await GRole.findByIdAndDelete(id);

    res.json({
      role,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { delGRole };
