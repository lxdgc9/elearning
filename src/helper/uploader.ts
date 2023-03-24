// Helper upload file lưu ở folder upload
// và lưu tên với định dạng uft8
// *** Giới hạn file 1G

import multer, { diskStorage } from "multer";

const uploader = multer({
  storage: diskStorage({
    destination(_req, _file, callback) {
      callback(null, "../upload"); // đường dẫn lưu file
    },
    filename(_req, file, callback) {
      // lưu tên với dạng utf8
      file.originalname = Buffer.from(
        file.originalname,
        "latin1"
      ).toString("utf8");
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000 * 1024 * 1024, // giới hạn: 1G
  },
});

export { uploader };
