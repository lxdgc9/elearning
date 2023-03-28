import path from "path";

import multer from "multer";

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
    fileSize: 1048576000,
  },
});

export { uploader };
