import { NotFoundErr } from "../../../err/not-found.js";
import { Role } from "../../../model/role.js";

async function getRoles(_req, res, next) {
  try {
    const roles = await Role.find({})
      .populate([
        {
          path: "perms",
          select: "-group -roles",
        },
        {
          path: "users",
          select: "-role -classes",
        },
      ])
      .sort({
        createdAt: -1,
      });
    if (!roles.length) {
      throw new NotFoundErr("Danh sách vai trò trống");
    }

    res.json({
      roles,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getRoles };
