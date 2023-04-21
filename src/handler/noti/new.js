const Noti = require("../../model/noti");

async function newNoti(req, res, next) {
  const { userIds, data } = req.body;

  try {
    for await (const u of userIds) {
      const newNoti = new Noti({
        user: u,
        data,
      });
      await newNoti.save();
    }

    res.json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = newNoti;
