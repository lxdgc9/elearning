import { NotFoundErr } from "../../../err/not-found.js";
import { User } from "../../../model/user.js";

async function getUser(req, res, next) {
  try {
    const user = await User.findById(
      req.params.id
    ).populate([
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