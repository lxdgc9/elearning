const Rating = require("../../model/rating");
const BadReqErr = require("../../error/bad-req");
const Course = require("../../model/course");

async function rate(req, res, next) {
  const { range, content, covert } = req.body;

  try {
    const doc = await Rating.findOneAndUpdate(
      { course: req.params.courseId, user: req.user.id },
      {
        $set: {
          range,
          content,
          covert,
        },
      },
      { upsert: true, new: true }
    );
    if (!doc) {
      throw new BadReqErr("Yêu cầu không hợp lệ");
    }

    await Course.findByIdAndUpdate(doc.course, {
      $addToSet: {
        ratings: doc._id,
      },
    });

    res.json({
      rating: doc,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = rate;
