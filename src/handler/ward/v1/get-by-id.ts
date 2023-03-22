import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { Ward } from "../../../model/ward";

async function getWard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const ward = await Ward.findById(id);
    if (!ward) {
      throw new NotFoundErr("Không Tìm Thấy Phường/Xã");
    }

    res.json({
      ward,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getWard };
