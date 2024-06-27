import dotenv from "dotenv";
import { WebhookRequiredHeaders } from "svix";
import { NextFunction, Request, Response } from "express";

import {
  clerkWebHookService,
  getTodaysBirthdayServices,
} from "../services/clerkWebhookServices";
import { CustomError } from "../custom/CustomError";

dotenv.config();

export const clerkWebHook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(16, req.headers.referer, req.path);
    console.log(20, req.headers);
    const payloadString = req.body;
    const svixHeaders = req.headers as unknown as WebhookRequiredHeaders;
    if (!payloadString || !svixHeaders) {
      throw new CustomError("parameteres not passed", 422);
    }
    await clerkWebHookService(payloadString, svixHeaders);
    return res.status(200).json({
      success: true,
      message: "webhook received",
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

export const getTodaysBirthdayController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const birthdayList = await getTodaysBirthdayServices();
    res.json(birthdayList);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
