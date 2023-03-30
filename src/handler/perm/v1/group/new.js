import { PermGr } from "../../../../model/perm-gr.js";

async function newPermGr(req, res, next) {
  const { name } = req.body;

  try {
    const permGr = new PermGr({
      name,
    });
    await permGr.save();

    res.status(201).json({
      group: permGr,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newPermGr };
