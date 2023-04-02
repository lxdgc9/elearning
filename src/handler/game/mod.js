const Class = require("../../model/class");
const Game = require("../../model/game");
const BadReqErr = require("../../error/bad-req.js");

async function modGame(req, res, next) {
  const { classId, name, type, time, questionNum, quiz } =
    req.body;

  try {
    // Kiểm tra người tạo
    const game = await Game.findById(req.params.id);
    if (!game) {
      throw new BadReqErr("Trò chơi không tồn tại");
    }

    if (!game.owner.equals(req.user.id)) {
      throw new BadReqErr(
        "Bạn không phải người tạo trò chơi này"
      );
    }

    // Kiểm tra người dùng có thuộc lớp này không
    const _class = await Class.findById(classId);
    if (!_class) {
      throw new BadReqErr("Lớp không tồn tại");
    }
    if (
      !_class.members.some((m) => m.equals(req.user.id))
    ) {
      throw new BadReqErr("Bạn không thuộc lớp này");
    }

    const detail = await Game.findOneAndUpdate(
      game._id,
      {
        class: _class._id,
        members: _class.members,
        name,
        type,
        time,
        questionNum,
        quiz,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      game: detail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = modGame;
