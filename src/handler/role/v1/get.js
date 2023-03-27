import { NotFoundErr } from "../../../err/not-found.js";
import { Role } from "../../../model/role.js";

async function getRoles(req, res, next) {
  try {
    const roles = await Role.find({})
      .populate([
        {
          path: "permissions",
        },
      ])
      .sort({ createdAt: -1 });
    if (!roles.lengh) {
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
