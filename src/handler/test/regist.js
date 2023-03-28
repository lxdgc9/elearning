const Submission = require("../../model/submission");

async function regist(req, res, next) {
  const { testId } = req.body;
  try {
    const newSubmission = new Submission({
      user: req.user.id,
      test: testId,
    });
    await newSubmission.save();
    res.status(201).json({
      submission: newSubmission,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = regist;
