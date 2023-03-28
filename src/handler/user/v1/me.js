import { UnauthorizedErr } from "../../../err/unauthorized.js";
import { User } from "../../../model/user.js";

async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.id)
      .select("-logs")
      .populate([
        {
          path: "role",
          populate: [
            {
              path: "permissions",
            },
          ],
        },
        {
          path: "classes",
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
