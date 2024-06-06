import { NextFunction, Request, Response } from "express";

import io from "../app";
import { CustomError } from "../custom/CustomError";
import {
  getAllLeavesServices,
  getLeaveServices,
  postActionOnLeaveServices,
  postCreateLeaveServices,
} from "../services/leaveServices";

export const postCreateLeaveController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate, leaveType, reason, employeeId } = req.body;
    if (!startDate || !endDate || !leaveType || !reason || !employeeId) {
      throw new CustomError("appropriate parameters not passed", 422);
    }
    if (
      typeof startDate !== "number" ||
      typeof endDate !== "number" ||
      !["selectedHours", "fullDay", "SeveralDays"].includes(
        leaveType as "selectedHours" | "fullDay" | "SeveralDays"
      ) ||
      typeof reason !== "string" ||
      typeof employeeId !== "string"
    ) {
      throw new CustomError(
        "type of the the parameters are not appropriate",
        422
      );
    }
    await postCreateLeaveServices(
      startDate,
      endDate,
      leaveType,
      reason,
      employeeId
    );
    return res.status(201).json(employeeId);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

export const getLeavesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("getLeavesController");
  try {
    const { userId } = req.params;
    if (userId === "") {
      throw new CustomError("userId not revived", 422);
    }
    const result = await getLeaveServices(userId);
    return res.json(result);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

export const getAllLeavesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //check if the req.isAdmin is there
  console.log("getAllLeavesController");
  try {
    const result = await getAllLeavesServices();
    return res.json(result);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

export const postActionOnLeaveController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("postActionOnLeaveController");
  try {
    const { data } = req.body;
    if (!data) {
      throw new CustomError("parameters not recived", 422);
    }
    if (data.leaveId === null) {
      throw new CustomError("employeeId not passed", 422);
    }
    if (!req.userId) {
      throw new CustomError("userId not assigned", 422);
    }
    const result = await postActionOnLeaveServices(
      data.leaveId,
      data.approve,
      req.userId
    );
    if (!result) {
      throw new CustomError("result not returened", 422);
    }
    console.log("success");
    // io.to(result.externalId).emit("actionSuccess", {
    //   status: "success",
    // });
    return res.json(result);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
