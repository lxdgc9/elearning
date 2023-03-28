import { BadReqErr } from "../../../err/bad-req.js";
import { GPerm } from "../../../model/gperm.js";
import { Perm } from "../../../model/perm.js";

async function newPerm(req, res, next) {
  const { code, groupId, description } = req.body;

  try {
    // Kiểm tra nhóm quyền
    const gPerm = await GPerm.findById(groupId);
    if (!gPerm) {
      throw new BadReqErr("Nhóm quyền không tồn tại");
    }

    // Kiểm tra mã quyền hạn
    const perm = await Perm.findOne({ code });
    if (perm) {
      throw new BadReqErr("Mã quyền hạn đã tồn tại");
    }

    const newPerm = new Perm({
      code,
      description,
      group: groupId,
    });
    await newPerm.save();

    // Cập nhật danh sách quyền hạn từ nhóm quyền
    await gPerm.updateOne({
      $addToSet: {
        permissions: newPerm.id,
      },
    });

    // Lấy chi tiết thông tin quyền hạn vừa tạo
    const permDetail = await Perm.findById(
      newPerm.id
    ).populate([
      {
        path: "group",
      },
    ]);

    res.status(201).json({
      permission: permDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newPerm };
