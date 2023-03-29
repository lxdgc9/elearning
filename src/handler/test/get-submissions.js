const Submission = require("../../model/submission");

async function getSubmissions(req, res, next) {
  try {
    const submissions = await Submission.find({
      user: req.user.id,
    })
      .populate([
        {
          path: "test",
          select: "-question",
        },
      ])
      .sort({ createdAt: -1 });

    res.json({
      submissions,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getSubmissions;
