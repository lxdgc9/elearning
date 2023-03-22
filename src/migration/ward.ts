import csv from "csv-parser";
import { createReadStream } from "fs";
import { join } from "path";
import { District } from "../model/district";
import { Ward } from "../model/ward";

type DataMigra = {
  name: string;
  code: number;
  districtCode: number;
};

async function migrate() {
  try {
    const numDocs = await Ward.countDocuments();
    if (!numDocs) {
      // xóa collection
      Ward.collection.drop();

      // đọc file csv tiến hành migrate dữ liệu
      const data: DataMigra[] = [];
      createReadStream(
        join(__dirname, "../../data/ward.csv")
      )
        .pipe(csv())
        .on("data", (record) => data.push(record))
        .on("end", () => {
          // tiến hành migrate data
          data.forEach(
            async ({ name, code, districtCode }) => {
              if (name && code && districtCode) {
                const ward = Ward.build({
                  name,
                  code,
                  districtCode,
                });
                await ward.save();

                await District.findOneAndUpdate(
                  { code: districtCode },
                  {
                    $addToSet: {
                      wards: ward.id,
                    },
                  }
                );
              }
            }
          );
          console.log("Ward migration success");
        });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export { migrate };
