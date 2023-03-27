import { BadReqErr } from "../../../../err/bad-req.js";
import { GPerm } from "../../../../model/gperm.js";

async function deleteGPerm(req, res, next) {
  try {
    const gPerm = await GPerm.findByIdAndDelete(
      req.params.id
    );
    if (!gPerm) {
      throw new BadReqErr("Nhóm quyền không tồn tại");
    }

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { deleteGPerm };
