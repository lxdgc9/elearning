import { BadReqErr } from "../../../err/bad-req";
import { Perm } from "../../../model/perm";
import { Role } from "../../../model/role";

async function deleteRole(req, res, next) {
  try {
    const role = await Role.findByIdAndDelete(
      req.params.id
    );
    if (!role) {
      throw new BadReqErr("Vai trò không tồn tại");
    }

    for await (const p of role.permissions) {
      await Perm.findByIdAndUpdate(p, {
        $pull: {
          roles: role.id,
        },
      });
    }

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { deleteRole };
