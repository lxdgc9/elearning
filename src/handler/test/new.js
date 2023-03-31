const Submission = require("../../model/submission");
const Test = require("../../model/test");

async function newTest(req, res, next) {
  const {
    title,
    password,
    duration,
    startedAt,
    classId,
    isPublish,
    memberIds,
    questions,
  } = req.body;
  try {
    const newTest = new Test({
      title,
      password,
      createdBy: req.user.id,
      class: classId,
      duration,
      startedAt,
      isPublish,
      members: memberIds,
      questions,
    });
    await newTest.save();

    console.log(questions);
    console.log(questions.length);

    for await (const m of newTest.members) {
      const newSubmission = new Submission({
        user: m,
        test: newTest.id,
        totalQuestion: questions.length || 0,
      });
      await newSubmission.save();

      // Thêm bài nộp vào bài kiểm tra để tiện populate
      await newTest.updateOne({
        $addToSet: {
          submissions: newSubmission.id,
        },
      });
    }

    res.status(201).json({
      test: newTest,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = newTest;
