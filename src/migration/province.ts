import csv from "csv-parser";
import { createReadStream } from "fs";
import { join } from "path";
import { Province } from "../model/province";

type DataMigra = {
  name: string;
  code: number;
};

async function migrate() {
  try {
    const numDocs = await Province.countDocuments();
    if (!numDocs) {
      // xóa collection
      Province.collection.drop();

      // đọc file csv tiến hành migrate dữ liệu
      const data: DataMigra[] = [];
      createReadStream(
        join(__dirname, "../../data/province.csv")
      )
        .pipe(csv())
        .on("data", (record) => data.push(record))
        .on("end", () => {
          // tiến hành migrate data
          data.forEach(async ({ name, code }) => {
            if (name && code) {
              const province = Province.build({
                name,
                code,
              });
              await province.save();
            }
          });
          console.log("Province migration success");
        });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export { migrate };
