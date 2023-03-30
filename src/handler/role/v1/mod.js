import { BadReqErr } from "../../../err/bad-req.js";
import { Perm } from "../../../model/perm.js";
import { Role } from "../../../model/role.js";

async function modRole(req, res, next) {
  const { name, desc, permIds } = req.body;

  try {
    if (!Object.keys(req.body).length) {
      throw new BadReqErr("Yêu cầu không hợp lệ");
    }

    const role = await Role.findById(req.params.id);
    if (!role) {
      throw new BadReqErr("Vai trò không tồn tại");
    }

    if (permIds && permIds.length > 0) {
      const perms = await Perm.find({ _id: permIds });
      if (perms.length !== permIds.length) {
        throw new BadReqErr(
          "Có quyền hạn trong danh sách không tồn tại"
        );
      }

      const permsMapped = perms.map((p) => p.id);
      for await (const p of role.perms) {
        if (!permsMapped.includes(p)) {
          await Perm.findByIdAndUpdate(p, {
            $pull: {
              roles: role.id,
            },
          });
        }
      }
      for await (const p of permsMapped) {
        await Perm.findByIdAndUpdate(p, {
          $addToSet: {
            roles: role.id,
          },
        });
      }

      await role.updateOne({
        $set: {
          name,
          desc,
          perms: permsMapped,
        },
      });
    } else {
      console.log("djsakdjkls");
      await role.updateOne({
        $set: {
          name,
          desc,
        },
      });
    }

    const detail = await Role.findById(role.id).populate([
      {
        path: "perms",
        select: "-group -roles",
      },
      {
        path: "users",
        select: "-role -classes",
      },
    ]);

    res.json({
      role: detail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { modRole };
