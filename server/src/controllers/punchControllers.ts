import { NextFunction, Request, Response } from "express";
import { CustomError } from "../custom/CustomError";
import {
  punchDisplayServices,
  punchServices,
  weeklyPunchServices,
} from "../services/punchServices";

export const punchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { mode } = req.body;
    const userId = req.userId;
    if (!userId) {
      throw new CustomError("userId not provided in request", 422);
    }
    if (mode === "punch-in" || mode === "punch-out") {
      const punchedResult = await punchServices(mode, userId);
      return res.json({ message: punchedResult });
    } else {
      throw new CustomError("appropriate mode of punch is not provided", 422);
    }
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

export const punchDisplayController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page } = req.params;
    if (page === "") {
      throw new CustomError(
        "Page Params is of empty string passed in params",
        422
      );
    }
    const numPageParams = Number(page);
    const data = await punchDisplayServices(numPageParams);
    return res.json(data);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

export const weeklyPunchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { weekStart, weekEnd } = req.query;

    if (!weekStart || !weekEnd) {
      throw new CustomError("params in query not provided", 422);
    }
    const numWeekStart = Number(weekStart);
    const numWeekEnd = Number(weekEnd);
    if (Number.isNaN(numWeekEnd) || Number.isNaN(numWeekStart)) {
      throw new CustomError("params are not of number", 422);
    }
    const result = await weeklyPunchServices(numWeekStart, numWeekEnd);
    console.log(result);
    res.json(result);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
