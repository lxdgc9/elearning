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
        path: "groupRole",
        select: "-_id",
        populate: [
          {
            path: "roles",
            select: "-_id name description ",
          },
        ],
      },
      {
        path: "role",
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
