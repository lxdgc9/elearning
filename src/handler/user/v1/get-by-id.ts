import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { User } from "../../../model/user";

async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const user = await User.findById(id)
      .select("-logs -classes")
      .populate([
        {
          path: "role",
          select: "name description permissions",
          populate: [
            {
              path: "permissions",
              select: "name description",
            },
          ],
        },
      ]);
    if (!user) {
      throw new NotFoundErr("Không tìm thấy người dùng");
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
