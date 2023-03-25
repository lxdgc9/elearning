const { NotFoundErr } = require("../../../error/not-found");
const { Subject } = require("../../../model/subject");

async function getSubject(req, res, next) {
  const { id } = req.params;

  try {
    const subject = await Subject.findById(id);
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

module.exports = { getSubject };
