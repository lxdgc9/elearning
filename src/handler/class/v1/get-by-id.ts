import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { Class } from "../../../model/class";

async function getClass(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  try {
    const _class = await Class.findById(id);
    if (!_class) {
      throw new NotFoundErr("CLASS_NOT_FOUND");
    }

    res.json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getClass };
