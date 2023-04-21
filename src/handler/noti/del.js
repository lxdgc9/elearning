const Noti = require("../../model/noti");

async function delNoti(req, res, next) {
  try {
    await Noti.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = delNoti;
