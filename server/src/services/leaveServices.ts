import { CustomError } from "../custom/CustomError";
import {
  createLeave,
  findLeaves,
  updateLeave,
} from "../dbServices/leaveDBServices";
import { createNotification } from "../dbServices/notificationDBServices";
import { findOneUser, findUsers } from "../dbServices/userDbServices";
import { LeaveInterface } from "../types/Leave";
import { ExternalError } from "../types/externalError";
import { timeCalculations } from "../util/timeCalculations";
import io from "../app";

export const postCreateLeaveServices = async (
  startDate: number,
  endDate: number,
  leaveType: "selectedHours" | "fullDay" | "SeveralDays",
  reason: string,
  empId: string
) => {
  if (!startDate || !endDate || !leaveType || !reason || !empId) {
    throw new Error("parameters not passed");
  }
  try {
    const findUser = await findOneUser({ externalId: empId });
    if (!findUser?._id) {
      throw new CustomError("user not found", 404);
    }
    await createLeave({
      employeeId: findUser?._id.toString(),
      endDate: endDate,
      leaveType: leaveType,
      reason: reason,
      startDate: startDate,
    });
    const admins = await findUsers({ isAdmin: true });
    const notifications: { userId: string; message: string; route: string }[] =
      [];
    admins.map((admin) => {
      const tempNoti: { userId: string; message: string; route: string } = {
        userId: admin._id.toString(),
        message: `${
          findUser.name
        } has applied for leave for a time period of ${timeCalculations(
          startDate,
          endDate
        )}`,
        route: "/adminReview",
      };
      notifications.push(tempNoti);
    });
    await createNotification(notifications);
    const adminsIds = admins.map((admin) => admin.externalId);
    io.to(adminsIds).emit("actionSuccess", { status: "success" });
    //send email
    return empId;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const getLeaveServices = async (userId: string) => {
  try {
    if (!userId) {
      const newError = new Error("userId not passed") as ExternalError;
      newError.statusCode = 422;
      throw newError;
    }
    const user = await findOneUser({ externalId: userId });
    if (!user) {
      const newError = new Error("user not found") as ExternalError;
      newError.statusCode = 404;
      throw newError;
    }
    const leavesResult = await findLeaves({
      query: { employeeId: user._id.toString() },
    }).populate("approvedBy");
    return leavesResult;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const getAllLeavesServices = async () => {
  try {
    const result = await findLeaves({ populate: "employeeId" });
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const postActionOnLeaveServices = async (
  leaveId: string,
  approve: boolean,
  adminExternalId: string
) => {
  try {
    console.log(leaveId, approve, adminExternalId);
    if (!leaveId || !adminExternalId) {
      throw new CustomError("parameters not passed", 422);
    }
    const admin = await findOneUser({ externalId: adminExternalId });

    if (!admin) {
      throw new CustomError("No admin found with that userId", 404);
    }

    const leave = await updateLeave(
      { _id: leaveId },
      approve
        ? {
            approved: true,
            cancelled: false,
            approvedBy: admin._id.toString(),
          }
        : {
            approved: false,
            cancelled: true,
            approvedBy: admin._id.toString(),
          }
    );
    if (!leave) {
      throw new CustomError("leave was not able to be updated", 422);
    }

    const employeeUser = await findOneUser({
      _id: leave.employeeId?.toString(),
    });
    if (!employeeUser) {
      throw new CustomError("User not found", 404);
    }
    await createNotification({
      userId: employeeUser._id.toString(),
      message: approve
        ? `Your leave application for ${timeCalculations(
            leave.startDate,
            leave.endDate
          )} has been approved ${admin?.name}`
        : `Your leave application for ${timeCalculations(
            leave.startDate,
            leave.endDate
          )} has been rejcted ${admin?.name}`,
      route: "/userLeaves",
    });
    return employeeUser;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
