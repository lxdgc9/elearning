import csv from "csv-parser";
import { createReadStream } from "fs";
import { join } from "path";
import { District } from "../model/district";
import { Province } from "../model/province";

type DataMigra = {
  name: string;
  code: number;
  provinceCode: number;
};

async function migrate() {
  try {
    const numDocs = await District.countDocuments();
    if (!numDocs) {
      // xóa collection
      District.collection.drop();

      // đọc file csv tiến hành migrate dữ liệu
      const data: DataMigra[] = [];
      createReadStream(
        join(__dirname, "../../data/district.csv")
      )
        .pipe(csv())
        .on("data", (record) => data.push(record))
        .on("end", () => {
          // tiến hành migrate data
          data.forEach(
            async ({ name, code, provinceCode }) => {
              if (name && code && provinceCode) {
                const district = District.build({
                  name,
                  code,
                  provinceCode,
                });
                await district.save();

                await Province.findOneAndUpdate(
                  { code: provinceCode },
                  {
                    $addToSet: {
                      districts: district.id,
                    },
                  }
                );
              }
            }
          );
          console.log("District migration success");
        });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export { migrate };
