import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
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
        populate: [
          {
            path: "role",
            populate: [
              {
                path: "permissions",
              },
            ],
          },
        ],
      },
    ]);
    if (!classes.length) {
      throw new NotFoundErr("Danh sách lớp học trống");
    }

    res.json({
      classes,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getClasses };
