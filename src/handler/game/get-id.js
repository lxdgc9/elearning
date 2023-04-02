const BadReqErr = require("../../error/bad-req");
const NotFoundErr = require("../../error/not-found");
const Game = require("../../model/game");

async function getGame(req, res, next) {
  try {
    const game = await Game.findById(
      req.params.id
    ).populate([
      {
        path: "owner",
      },
      {
        path: "members",
      },
    ]);
    if (!game) {
      throw new NotFoundErr("Không tìm thấy trò chơi");
    }
    if (!game.members.some((m) => m.equals(req.user.id))) {
      throw new BadReqErr(
        "Bạn không được phép tham gia trò chơi này"
      );
    }

    res.json({
      game,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getGame;
