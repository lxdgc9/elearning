const Rating = require("../../model/rating");
const BadReqErr = require("../../error/bad-req");

async function rate(req, res, next) {
  const { range, content } = req.body;

  try {
    const doc = await Rating.findOneAndUpdate(
      { course: req.params.courseId, user: req.user.id },
      {
        $set: {
          range,
          content,
        },
      },
      { upsert: true, new: true }
    );
    if (!doc) {
      throw new BadReqErr("Yêu cầu không hợp lệ");
    }

    console.log(doc);

    res.json({
      rating: doc,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = rate;
