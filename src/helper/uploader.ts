import multer, { diskStorage } from "multer";

const uploader = multer({
  storage: diskStorage({
    destination(_req, _file, callback) {
      callback(null, "../uploads");
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
    fileSize: 500 * 1024 * 1024, // Limit: 500M
  },
});

export { uploader };
