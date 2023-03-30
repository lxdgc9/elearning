import { BadReqErr } from "../../../err/bad-req.js";
import { Perm } from "../../../model/perm.js";
import { Role } from "../../../model/role.js";
import { User } from "../../../model/user.js";

async function delRole(req, res, next) {
  try {
    const role = await Role.findByIdAndDelete(
      req.params.id
    );
    if (!role) {
      throw new BadReqErr("Vai trò không tồn tại");
    }

    for await (const p of role.perms) {
      await Perm.findByIdAndUpdate(p, {
        $pull: {
          roles: role._id,
        },
      });
    }

    for await (const u of role.users) {
      await User.findByIdAndUpdate(u, {
        $unset: {
          role: 1,
        },
      });
    }

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { delRole };
