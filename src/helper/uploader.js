// Lưu ở folder upload và lưu tên với định dạng uft8
const path = require("path");
const fs = require("fs");
const multer = require("multer");

if (!fs.existsSync(path.join(path.resolve(), "upload"))) {
  fs.mkdir(
    path.join(path.resolve(), "upload"),
    { recursive: true },
    (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("Directory created successfully!");
    }
  );
}

const uploader = multer({
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, path.join(path.resolve(), "upload"));
    },
    filename(_req, file, callback) {
      file.originalname = Buffer.from(
        file.originalname,
        "latin1"
      ).toString("utf8");
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1200 * 1024 * 1024, // Giới hạn: 1.2G
  },
  fileFilter: function (_req, file, cb) {
    // Ignore null files
    if (!file) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  },
});

module.exports = uploader;
