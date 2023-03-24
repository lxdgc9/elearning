import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { User } from "../../../model/user";

type AccessUserDto = {
  status: boolean;
};

async function accessUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const { status }: AccessUserDto = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          hasAccess: status,
        },
      },
      { new: true }
    )
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

export { accessUser };
