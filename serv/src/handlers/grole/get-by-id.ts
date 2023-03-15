import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { Role } from "../../models/role";

async function getGRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  try {
    const grole = await Role.findById(id);
    if (!grole) {
      throw new NotFoundError("Không Tìm Thấy Group Role");
    }

    res.json({
      role: grole,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getGRole };
