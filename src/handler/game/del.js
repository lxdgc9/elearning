const Class = require("../../model/class");
const Game = require("../../model/game");
const BadReqErr = require("../../error/bad-req.js");

async function delGame(req, res, next) {
  try {
    // Kiểm tra người dùng có phải là người tạo trò chơi này không?
    const game = await Game.findById(req.params.id);
    if (!game.owner.equals(req.user.id)) {
      throw new BadReqErr(
        "Bạn không phải người tạo trò chơi này"
      );
    }

    await Game.findByIdAndDelete(game._id);

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = delGame;
