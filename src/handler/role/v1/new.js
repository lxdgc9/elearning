import { BadReqErr } from "../../../err/bad-req.js";
import { Perm } from "../../../model/perm.js";
import { Role } from "../../../model/role.js";

async function newRole(req, res, next) {
  const { name, desc, permIds } = req.body;

  try {
    let role;
    if (permIds) {
      const perms = await Perm.find({ _id: permIds });
      if (perms.length !== permIds.length) {
        throw new BadReqErr(
          "Có quyền hạn trong danh sách không tồn tại"
        );
      }

      role = new Role({
        name,
        desc,
        perms: perms.map((p) => p.id),
      });

      for await (const p of perms) {
        await p.updateOne({
          $addToSet: {
            roles: role.id,
          },
        });
      }
    } else {
      role = new Role({
        name,
        desc,
      });
    }

    if (role) {
      await role.save();
    }

    const detail = await Role.findById(role.id).populate([
      {
        path: "perms",
        select: "-group -roles",
      },
    ]);

    res.status(201).json({
      role: detail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newRole };
