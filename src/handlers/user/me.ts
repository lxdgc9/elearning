import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user";

async function me(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.user!;

  try {
    const user = await User.findById(id).populate([
      {
        path: "profile",
        select: "-_id",
      },
      {
        path: "role",
        select: "-_id",
        populate: [
          {
            path: "permissions",
            select: "-_id",
          },
        ],
      },
    ]);
    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { me };
