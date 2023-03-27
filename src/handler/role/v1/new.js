import { BadReqErr } from "../../../err/bad-req.js";
import { Perm } from "../../../model/perm.js";
import { Role } from "../../../model/role.js";

async function newRole(req, res, next) {
  const { name, description, permissionIds } = req.body;

  try {
    if (permissionIds && permissionIds.length > 0) {
      const perms = await Perm.find({ _id: permissionIds });
      if (perms.length !== permissionIds.length) {
        throw new BadReqErr(
          "Có quyền hạn trong danh sách không tồn tại"
        );
      }
    }

    const role = new Role({
      name,
      description,
      permissions: permissionIds,
    });
    await role.save();

    for await (const p of permissionIds) {
      await Perm.findByIdAndUpdate(p, {
        $addToSet: {
          roles: role.id,
        },
      });
    }

    const roleDetail = await Role.findById(
      role.id
    ).populate([
      {
        path: "permissions",
      },
    ]);

    res.status(201).json({
      role: roleDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newRole };
