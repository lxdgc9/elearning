import { BadReqErr } from "../../../err/bad-req.js";
import { Perm } from "../../../model/perm.js";
import { Role } from "../../../model/role.js";

async function updateRole(req, res, next) {
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

    const role = await Role.findById(req.params.id);
    if (!role) {
      throw new BadReqErr("Vai trò không tồn tại");
    }

    if (permissionIds && permissionIds.length > 0) {
      for await (const p of role.permissions) {
        if (!permissionIds.includes(p)) {
          await Perm.findByIdAndUpdate(p, {
            $pull: {
              roles: role.id,
            },
          });
        }
      }

      for await (const p of permissionIds) {
        await Perm.findByIdAndUpdate(p, {
          $addToSet: {
            roles: role.id,
          },
        });
      }
    }

    const roleDetail = await Role.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        permissions: permissionIds,
      },
      { new: true }
    ).populate([
      {
        path: "permissions",
      },
    ]);

    res.json({
      role: roleDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updateRole };
