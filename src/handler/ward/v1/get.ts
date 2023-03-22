import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { Ward } from "../../../model/ward";

async function getWards(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const wards = await Ward.find({});
    if (!wards.length) {
      throw new NotFoundErr("Danh Sách Phường/Xã Trống");
    }

    res.json({
      wards,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getWards };
