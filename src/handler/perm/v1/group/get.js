import { GPerm } from "../../../../model/gperm.js";

async function getGPerms(_req, res, next) {
  try {
    const gperms = await GPerm.find({}).populate([
      {
        path: "permissions",
      },
    ]);

    res.json({
      group: gperms,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getGPerms };
