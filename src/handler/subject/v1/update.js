const Subject = require("../../../model/subject");

async function updateSubject(req, res, next) {
  const { name, description } = req.body;

  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
      },
      {
        new: true,
      }
    );

    res.json({
      subject,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = updateSubject;
