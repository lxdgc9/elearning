import path from "path";
import { existsSync, mkdirSync } from "fs";

import multer from "multer";

function uploader(myPath) {
  const helper = multer({
    storage: multer.diskStorage({
      destination(_req, _file, callback) {
        const dir = path.join(
          path.resolve(),
          "upload",
          myPath
        );
        if (!existsSync(dir)) {
          mkdirSync(dir, {
            recursive: true,
          });
        }

        callback(null, dir);
      },
      filename(_req, file, callback) {
        file.originalname = Buffer.from(
          file.originalname,
          "latin1"
        ).toString("utf8");
        callback(
          null,
          `${Date.now()}-${file.originalname}`
        );
      },
    }),
    limits: {
      fileSize: 1048576000,
    },
  });

  return helper.single("file");
}

export { uploader };
