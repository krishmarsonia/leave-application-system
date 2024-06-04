import { CustomError } from "../custom/CustomError";
import {
  createPunch,
  findPunch,
  getPunches,
} from "../dbServices/punchDBServices";
import {
  findOnePunchHistory,
  findPunchHistories,
} from "../dbServices/punchHistoryDBServices";
import { findOneUser } from "../dbServices/userDbServices";

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
