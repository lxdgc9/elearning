import { NextFunction, Request, Response } from "express";

function getProvinces(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.redirect(
      "https://provinces.open-api.vn/api/?depth=3"
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getProvinces };
