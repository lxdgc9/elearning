const Noti = require("../../model/noti");

async function getNotis(req, res, next) {
  try {
    const notis = await Noti.find({ user: req.user.id });

    res.json({
      notifications: notis,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getNotis;
