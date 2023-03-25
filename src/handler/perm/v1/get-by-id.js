const { NotFoundErr } = require("../../../error/not-found");
const { Perm } = require("../../../model/perm");

async function getPerm(req, res, next) {
  const { id } = req.params;

  try {
    const perm = await Perm.findById(id);
    if (!perm) {
      throw new NotFoundErr("Không Tìm Thấy Quyền");
    }

    res.json({
      permission: perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { getPerm };
