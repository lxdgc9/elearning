import { NotFoundErr } from "../../../err/not-found";
import { Perm } from "../../../model/perm";

async function getPerm(req, res, next) {
  try {
    const perm = await Perm.findById(
      req.params.id
    ).populate([
      {
        path: "group",
      },
    ]);
    if (!perm) {
      throw new NotFoundErr("Không tìm thấy quyền hạn");
    }

    res.json({
      permission: perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getPerm };
