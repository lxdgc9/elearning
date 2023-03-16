import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found-error";
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
        path: "profile",
      },
    ]);
    if (!user) {
      throw new NotFoundError("Không Tìm Thấy Người Dùng");
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
