const Course = require("../../../model/course");
const Process = require("../../../model/process");

async function setProcess(req, res, next) {
  const { volume } = req.body;
  try {
    const process = await Process.findOneAndUpdate(
      { course: req.params.id },
      {
        $set: {
          course: req.params.id,
          user: req.user.id,
          volume,
        },
      },
      { new: true, upsert: true }
    );

    await Course.findByIdAndUpdate(req.params.id, {
      $addToSet: {
        process: process._id,
      },
    });

    res.json({ process });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = setProcess;
