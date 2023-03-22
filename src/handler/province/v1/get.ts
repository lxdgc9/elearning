import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { Province } from "../../../model/province";

async function getProvinces(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const provinces = await Province.find({}).populate([
      {
        path: "districts",
        select: "-wards",
      },
    ]);
    if (!provinces.length) {
      throw new NotFoundErr(
        "Danh Sách Tỉnh/Thành Phố Trống"
      );
    }

    res.json({
      provinces,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getProvinces };
