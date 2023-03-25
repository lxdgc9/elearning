// Lưu ở folder upload và lưu tên với định dạng uft8
const multer = require("multer");

const uploader = multer({
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, "../upload"); // Đường dẫn lưu file
    },
    filename(_req, file, callback) {
      // Lưu tên với dạng utf8
      file.originalname = Buffer.from(
        file.originalname,
        "latin1"
      ).toString("utf8");
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000 * 1024 * 1024, // Giới hạn: 1G
  },
});

module.exports = uploader;
