const NotFoundErr = require("../../error/not-found");
const Game = require("../../model/game");

async function myGames(req, res, next) {
  try {
    const games = await Game.find({
      owner: req.user.id,
      class: req.params.classId,
    }).populate([
      {
        path: "owner",
      },
      {
        path: "members",
      },
    ]);
    if (!games.length) {
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

module.exports = myGames;
