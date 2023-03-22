import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { Province } from "../../../model/province";

async function getProvince(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const province = await Province.findById(id).populate([
      {
        path: "districts",
        select: "-wards",
      },
    ]);
    if (!province) {
      throw new NotFoundErr(
        "Không Tìm Thấy Tỉnh/Thành Phố"
      );
    }

    res.json({
      province,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getProvince };
