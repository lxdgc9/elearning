import { NotFoundErr } from "../../../err/not-found";
import { User } from "../../../model/user";

async function getUser(req, res, next) {
  try {
    const user = await User.findById(
      req.params.id
    ).populate([
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
