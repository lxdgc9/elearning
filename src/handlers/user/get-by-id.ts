import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../errors/not-found";
import { User } from "../../models/user";

async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate([
      {
        path: "role",
        populate: [
          {
            path: "permissions",
          },
        ],
      },
    ]);
    if (!user) {
      throw new NotFoundErr("USER_NOT_FOUND");
    }

    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getUser };
