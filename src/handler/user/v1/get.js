import { NotFoundErr } from "../../../err/not-found.js";
import { User } from "../../../model/user.js";

async function getUsers(_req, res, next) {
  try {
    const users = await User.find({})
      .populate([
        {
          path: "role",
          select: "-perms -users",
        },
        {
          path: "classes",
          select: "-members -channels",
          options: {
            sort: {
              createdAt: -1,
            },
          },
        },
      ])
      .sort({
        createdAt: -1,
      });
    if (!users.length) {
      throw new NotFoundErr("Danh sách người dùng trống");
    }

    res.json({
      users,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getUsers };
