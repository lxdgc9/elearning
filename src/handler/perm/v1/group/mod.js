import { BadReqErr } from "../../../../err/bad-req.js";
import { PermGr } from "../../../../model/perm-gr.js";

async function modPermGr(req, res, next) {
  const { name } = req.body;

  try {
    if (!Object.keys(req.body).length) {
      throw new BadReqErr("Yêu cầu không hợp lệ");
    }

    const permGr = await PermGr.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
        },
      },
      { new: true }
    ).populate([
      {
        path: "permissions",
        select: "code description permissions",
      },
    ]);
    if (!permGr) {
      throw new BadReqErr("Nhóm quyền không tồn tại");
    }

    res.json({
      group: permGr,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { modPermGr };
