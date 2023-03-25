const NotFoundErr = require("../../../error/not-found");
const Subject = require("../../../model/subject");

async function getSubject(req, res, next) {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      throw new NotFoundErr("Không tìm thấy môn học");
    }

    res.json({
      subject,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getSubject;
