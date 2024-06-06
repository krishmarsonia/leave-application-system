import { NextFunction, Request, Response } from "express";
import { CustomError } from "../custom/CustomError";
import {
  getNotificationsServices,
  setNotificationsServices,
} from "../services/notificationServices";

export const getNotificationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new CustomError("parameters in the body not passed", 422);
    }
    const result = await getNotificationsServices(userId);
    return res.json(result);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

export const setNotificationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const data: {
      message?: string;
      opened?: boolean;
      route?: string;
      seen?: boolean;
      userId?: string;
      _id?: string;
    } = req.body;
    if (!userId || !data || userId === "") {
      throw new CustomError(
        "parameters not recived in either params or body",
        422
      );
    }
    const result = await setNotificationsServices(userId, data);
    return res.json(result);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
