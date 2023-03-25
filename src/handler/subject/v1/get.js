const { Subject } = require("../../../model/subject");

async function getSubjects(req, res, next) {
  try {
    const subjects = await Subject.find({});

    res.json({
      subjects,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { getSubjects };
