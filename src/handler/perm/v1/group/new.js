import { GPerm } from "../../../../model/gperm.js";

async function newGPerm(req, res, next) {
  const { name } = req.body;

  try {
    const gPerm = new GPerm({
      name,
    });
    await gPerm.save();

    res.status(201).json({
      groupPermission: gPerm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newGPerm };
