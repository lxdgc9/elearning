const Subject = require("../../../model/subject");

async function newSubject(req, res, next) {
  const { name, description } = req.body;

  try {
    const subject = Subject.build({
      name,
      description,
    });
    await subject.save();

    res.status(201).json({
      subject,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = newSubject;
