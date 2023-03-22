import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { District } from "../../../model/district";

async function getDistrict(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const district = await District.findById(id).populate([
      {
        path: "wards",
      },
    ]);
    if (!district) {
      throw new NotFoundErr("Không Tìm Thấy Quận/Huyện");
    }

    res.json({
      district,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getDistrict };
