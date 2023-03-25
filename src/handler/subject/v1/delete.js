const { NotFoundErr } = require("../../../error/not-found");
const { Subject } = require("../../../model/subject");

async function deleteSubject(req, res, next) {
  const { id } = req.params;

  try {
    const subject = await Subject.findByIdAndDelete(id);
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

module.exports = { deleteSubject };
