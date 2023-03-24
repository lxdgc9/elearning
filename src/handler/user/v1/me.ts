import { NextFunction, Request, Response } from "express";
import { User } from "../../../model/user";

async function me(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user!;

  try {
    const user = await User.findById(id)
      .select("-logs")
      .populate([
        {
          path: "role",
          select: "permissions",
          populate: [
            {
              path: "permissions",
              select: "name description",
            },
          ],
        },
        {
          path: "classes",
          select: "name session description",
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
