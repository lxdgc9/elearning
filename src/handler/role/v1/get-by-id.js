import { NotFoundErr } from "../../../err/not-found.js";
import { Role } from "../../../model/role.js";

async function getRole(req, res, next) {
  try {
    const role = await Role.findById(
      req.params.id
    ).populate([
      {
        path: "permissions",
      },
    ]);
    if (!role) {
      throw new NotFoundErr("Không tìm thấy vai trò");
    }

    res.json({
      role,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getRole };
