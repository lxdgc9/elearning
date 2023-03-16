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
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundErr("Không Tìm Thấy Người Dùng");
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
