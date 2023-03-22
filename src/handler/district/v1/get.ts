import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { District } from "../../../model/district";

async function getDistricts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const districts = await District.find({}).populate([
      {
        path: "wards",
      },
    ]);
    if (!districts.length) {
      throw new NotFoundErr("Danh Sách Quận/Huyện Trống");
    }

    res.json({
      districts,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getDistricts };
