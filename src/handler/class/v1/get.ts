import { NextFunction, Request, Response } from "express";
import { Class } from "../../../model/class";

async function getClasses(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const classes = await Class.find({}).populate([
      {
        path: "users",
      },
    ]);

    res.json({
      classes,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getClasses };
