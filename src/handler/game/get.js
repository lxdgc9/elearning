const NotFoundErr = require("../../error/not-found");
const Game = require("../../model/game");

async function getGames(req, res, next) {
  try {
    const games = await Game.find({
      members: req.user.id,
    }).populate([
      {
        path: "owner",
      },
      {
        path: "members",
      },
    ]);
    if (!games) {
      throw new NotFoundErr("Danh sách trò chơi trống");
    }

    res.json({
      games,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getGames;
