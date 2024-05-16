import { NextFunction, Request, Response } from "express";
import Notification from "../model/notification";

export const notificationCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await Notification.findOne({
    _id: "6642f5ffa7cf5e0080a43229",
  });
  console.log("testing", result);
  return res.json(result?.tempCountArr.length);
};
