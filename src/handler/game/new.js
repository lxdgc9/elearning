const Class = require("../../model/class");
const Game = require("../../model/game");
const BadReqErr = requires("../../error/bad-req.js");

async function newGame(req, res, next) {
  const { name, type, time, questionNum, quiz } = req.body;
  try {
    // Kiểm tra người dùng có thuộc lớp này không
    const _class = await Class.findById(req.params.classId);
    if (!_class) {
      throw new BadReqErr("Lớp không tồn tại");
    }
    if (
      !_class.members.some((m) => m.equals(req.user.id))
    ) {
      throw new BadReqErr("Bạn không thuộc lớp này");
    }

    const game = new Game({
      name,
      type,
      time,
      owner: req.user.id,
      members: _class.members,
      questionNum,
      quiz,
    });
    await game.save();

    const detail = await Game.findById(game._id).populate([
      {
        path: "owner",
      },
      {
        path: "members",
      },
    ]);

    res.status(201).json({
      game: detail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.export = newGame;
