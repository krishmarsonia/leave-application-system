import fs from "fs";

import { CustomError } from "../custom/CustomError";
import { findLeave } from "../dbServices/leaveDBServices";
import { findOneUser, findUsers } from "../dbServices/userDbServices";
import {
  createPunchHistory,
  findOnePunchHistory,
  findPunchHistories,
} from "../dbServices/punchHistoryDBServices";
import {
  createPunch,
  deletePunches,
  findPunch,
  getPunches,
} from "../dbServices/punchDBServices";

export const punchServices = async (
  mode: "punch-in" | "punch-out",
  userId: string
) => {
  try {
    if (mode === "punch-in" || mode === "punch-out") {
      const user = await findOneUser({ externalId: userId });
      if (!user) {
        throw new CustomError("no user found with this ID", 404);
      }
      const punches = await getPunches({
        query: { userId: user._id.toString() },
      });
      // const leave = allLeaves.find(
      //   (al) => al.userId?.toString() === user._id.toString()
      // );
      if (mode === "punch-in") {
        //if punch hoi to e jova nu ke ani phela ekai ma punch out ma zero nathi ne
        if (punches.length < 3) {
          const didntPunchedOut = punches.find((ps) => ps.punchOutTime === 0);
          if (didntPunchedOut) {
            throw new CustomError(
              "You haven't punch-out in the last punch please punch-out first to punch-in.",
              422
            );
          }
          await createPunch({
            userId: user._id.toString(),
            punchInTime: Date.now(),
          });
          return "Noted! you are punched-in. You may start your work.";
        } else {
          throw new CustomError(
            "You have already punched-out 3 times. You are not allowed to punch more than 3 times in a day",
            422
          );
        }
      } else {
        if (punches.length === 0) {
          throw new CustomError("no punch found with this punchId", 422);
        }
        const punchedInPunch = punches.find((ps) => ps.punchOutTime === 0);
        if (!punchedInPunch) {
          throw new CustomError(
            "You have already punched-out or you didn't punched-in in the first place.",
            422
          );
        }
        if (!punchedInPunch.punchInTime || punchedInPunch.punchInTime === 0) {
          throw new CustomError("please first punch-in to punch-out", 422);
        }
        if (punchedInPunch.punchOutTime !== 0) {
          throw new CustomError("you already punched-out!", 422);
        }
        punchedInPunch.punchOutTime = Date.now();
        await punchedInPunch.save();
        return "Noted! you are punched-out. You can enjoy rest of the day.";
      }
    } else {
      throw new CustomError("appropriate mode of punch is not provided", 422);
    }
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const punchDisplayServices = async (pageParams: number) => {
  const numberOfData = 10;
  if (pageParams < 10000000) {
    let tempData = [];
    const data = await getPunches({
      sort: { _id: "asc" },
      limit: numberOfData,
      skip: pageParams,
      populate: "userId",
    });
    data.map((da) => {
      da.set("isOnLeave", false, { strict: false });
      da.set("date", Date.now(), { strict: false });
      return da;
    });
    if (data.length < numberOfData) {
      const historyData = await findPunchHistories({
        sort: { _id: "asc" },
        limit: numberOfData - data.length,
        skip: 0,
        select: {
          _id: 1,
          punchInTime: 1,
          punchOutTime: 1,
          userId: 1,
          isOnLeave: 1,
          date: 1,
        },
        populate: "userId",
      });
      // const historyData = temphistoryData.map((thd) => {
      //   return {
      //     userId: thd.userId,
      //     punchCount: thd.punchCount,
      //     punchInTime: thd.punchInTime,
      //     punchOutTime: thd.punchOutTime,
      //   };
      // });
      tempData = [...data, ...historyData];
      return {
        data: tempData,
        currentPage: pageParams,
        nextPage: 10000000 + pageParams + numberOfData - data.length,
      };
    }
    return {
      data,
      currentPage: pageParams,
      nextPage: pageParams + numberOfData,
    };
  } else {
    console.log(116, pageParams);
    const data = await findPunchHistories({
      sort: { _id: "asc" },
      limit: numberOfData,
      skip: pageParams - 10000000,
      select: {
        _id: 1,
        punchInTime: 1,
        punchOutTime: 1,
      },
      populate: "userId",
    });
    return {
      data,
      currentPage: pageParams,
      nextPage: data.length !== 0 ? pageParams + numberOfData : null,
    };
  }
};

export const weeklyPunchServices = async (
  weekStart: number,
  weekEnd: number
) => {
  try {
    const punchHistories = await findPunchHistories({
      gte: weekStart,
      lte: weekEnd,
      gteWhere: "punchInTime",
      lteWhere: "punchOutTime",
    });
    const users = await findUsers();
    const finalArr: {
      userId: string;
      userName: string;
      leaveDays: number;
      workHours: number;
    }[] = [];
    users.map((user) => {
      let leaveCount = 0;
      let totalHours = 0;
      // const userPunchHistories = punchHistories.filter(
      //   (ph) => ph.userId.toString() === user._id.toString()
      // );
      punchHistories.map((uph) => {
        if (uph.userId.toString() === user._id.toString()) {
          if (uph.isOnLeave === true) {
            leaveCount++;
          } else {
            const timeDifference = uph.punchOutTime - uph.punchInTime;
            console.log(uph._id);
            if (timeDifference > 0) {
              const hours = timeDifference / 3600000;
              totalHours = totalHours + hours;
            }
          }
        }
      });
      if (!(totalHours === 0 && leaveCount === 0)) {
        finalArr.push({
          userId: user._id.toString(),
          userName: user.name,
          leaveDays: leaveCount,
          workHours: Math.ceil(totalHours),
        });
      }
    });
    return finalArr;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const punchCRONJobService = async () => {
  try {
    let users = await findUsers();
    const punches = await getPunches({});
    const tempEndPunchTime = new Date();
    const punchTransferDate = new Date();
    punchTransferDate.setHours(12, 0, 0, 0);
    tempEndPunchTime.setHours(18, 0, 0, 0);
    let tempPunchCount = 0;
    let punchesTransfer: {
      userId: string;
      punchInTime: number;
      punchOutTime: number;
      isOnLeave: boolean;
      date: number;
    }[] = [];
    punches.map(async (pun) => {
      users = users.filter(
        (user) => user._id.toString() !== pun.userId?.toString()
      );
      // if (pun.punchOutTime === 0) {
      //   pun.punchOutTime = tempEndPunchTime.getTime();
      //   await pun.save();
      // }
      punchesTransfer.push({
        userId: pun.userId?.toString()!,
        punchInTime: pun.punchInTime,
        punchOutTime: pun.punchOutTime,
        isOnLeave: false,
        date: punchTransferDate.getTime(),
      });
    });
    await createPunchHistory(punchesTransfer);
    punchesTransfer = [];
    console.log(109, users);
    await Promise.all(
      users.map(async (user) => {
        const leaveResult = await findLeave({
          employeeId: user._id.toString(),
          leaveType: { $in: ["fullDay", "SeveralDays"] },
          startDate: { $lt: punchTransferDate.getTime() },
          endDate: { $gt: punchTransferDate.getTime() },
        });
        console.log(leaveResult);
        if (leaveResult) {
          punchesTransfer.push({
            userId: user._id.toString(),
            date: punchTransferDate.getTime(),
            isOnLeave: true,
            punchInTime: 0,
            punchOutTime: 0,
          });
        } else {
          console.log("127, running");
          punchesTransfer.push({
            userId: user._id.toString(),
            date: punchTransferDate.getTime(),
            isOnLeave: false,
            punchInTime: 0,
            punchOutTime: 0,
          });
        }
        tempPunchCount++;
      })
    );
    console.log(134, punchesTransfer);
    await createPunchHistory(punchesTransfer);
    await deletePunches(true);
  } catch (error: any) {
    console.log(error);
    const content =
      new Date() +
      "\r\n" +
      (error.stack ? error.stack : error.message) +
      "\r\n" +
      "\r\n";
    fs.appendFileSync(process.cwd() + "/src/logs/scheduleError.txt", content);
  }
};
