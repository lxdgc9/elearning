import { BadReqErr } from "../../../err/bad-req.js";
import { GPerm } from "../../../model/gperm.js";
import { Perm } from "../../../model/perm.js";

async function updatePerm(req, res, next) {
  const { code, groupId, description } = req.body;

  try {
    // Kiểm tra quyền hạn có tồn tại hay không
    const perm = await Perm.findById(req.params.id);
    if (!perm) {
      throw new BadReqErr("Quyền hạn không tồn tại");
    }

    // Cập nhật danh sách quyền của nhóm quyền cũ và thêm
    // danh sách quyền này vào nhóm quyền mới
    const preGroup = perm.group;
    if (
      groupId &&
      groupId.toString() !== preGroup.toString()
    ) {
      console.log("vao day", groupId, preGroup);
      await GPerm.findByIdAndUpdate(preGroup, {
        $pull: { permissions: perm.id },
      });
      await GPerm.findByIdAndUpdate(groupId, {
        $addToSet: { permissions: perm.id },
      });
    }

    // Lấy chi tiết quyền hạn đã cập nhật trả về client
    const permDetail = await Perm.findByIdAndUpdate(
      perm.id,
      {
        code,
        group: groupId,
        description,
      },
      { new: true }
    ).populate([
      {
        path: "group",
      },
    ]);

    res.json({
      permission: permDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updatePerm };
