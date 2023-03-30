import { BadReqErr } from "../../../err/bad-req.js";
import { PermGr } from "../../../model/perm-gr.js";
import { Perm } from "../../../model/perm.js";

async function modPerm(req, res, next) {
  const { code, desc, groupId } = req.body;

  try {
    if (!Object.keys(req.body).length) {
      throw new BadReqErr("Yêu cầu không hợp lệ");
    }

    const perm = await Perm.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          code,
          desc,
        },
      }
    );
    if (!perm) {
      throw new BadReqErr("Quyền hạn không tồn tại");
    }

    if (groupId) {
      const permGr = await PermGr.findById(groupId);
      if (!permGr) {
        throw new BadReqErr("Nhóm quyền không tồn tại");
      }

      if (!permGr._id.equals(perm.group)) {
        await PermGr.findByIdAndUpdate(perm.group, {
          $pull: {
            perms: perm._id,
          },
        });
        await PermGr.findByIdAndUpdate(permGr._id, {
          $addToSet: {
            perms: perm._id,
          },
        });
      }

      await perm.updateOne({
        $set: {
          group: permGr._id,
        },
      });
    }

    const detail = await Perm.findById(perm._id).populate([
      {
        path: "group",
        select: "-perms",
      },
      {
        path: "roles",
        select: "-perms -users",
        options: {
          sort: {
            createdAt: -1,
          },
        },
      },
    ]);

    res.json({
      perm: detail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { modPerm };
