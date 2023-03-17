import { NextFunction, Request, Response } from "express";
import { User } from "../../../model/user";

async function me(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.user!;

  try {
    const user = await User.findById(id).populate([
      {
        path: "role",
        populate: [
          {
            path: "permissions",
            select: "-_id name description",
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
