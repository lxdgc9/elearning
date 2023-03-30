import { BadReqErr } from "../../../err/bad-req.js";
import { PermGr } from "../../../model/perm-gr.js";
import { Perm } from "../../../model/perm.js";

async function newPerm(req, res, next) {
  const { code, desc, groupId } = req.body;

  try {
    const permGr = await PermGr.findById(groupId);
    if (!permGr) {
      throw new BadReqErr("Nhóm quyền không tồn tại");
    }

    const perm = await Perm.findOne({ code });
    if (perm) {
      throw new BadReqErr("Mã quyền hạn đã tồn tại");
    }

    const newPerm = new Perm({
      code,
      desc,
      group: permGr._id,
    });
    await newPerm.save();

    await permGr.updateOne({
      $addToSet: {
        perms: newPerm._id,
      },
    });

    const detail = await Perm.findById(
      newPerm._id
    ).populate([
      {
        path: "group",
        select: "-perms",
      },
    ]);

    res.status(201).json({
      detail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newPerm };
