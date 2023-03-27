import { UnauthorizedErr } from "../../../err/unauthorized";
import { User } from "../../../model/user";

async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.id)
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
    if (!user) {
      throw new UnauthorizedErr("Người dùng không tồn tại");
    }

    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { me };
