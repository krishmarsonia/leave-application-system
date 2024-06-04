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
      const allLeaves = await getPunches({ sort: { punchCount: -1 } });
      const leave = allLeaves.find(
        (al) => al.userId?.toString() === user._id.toString()
      );
      if (mode === "punch-in") {
        if (leave) {
          throw new CustomError("punch-in of this day is already done.", 422);
        }
        if (allLeaves.length !== 0) {
          await createPunch({
            userId: user._id.toString(),
            punchInTime: Date.now(),
            punchCount: allLeaves[0].punchCount + 1,
          });
        } else {
          const historyLeave = await findOnePunchHistory({
            sort: { punchCount: -1 },
          });
          await createPunch({
            userId: user._id.toString(),
            punchInTime: Date.now(),
            punchCount: historyLeave ? historyLeave.punchCount + 1 : 1,
          });
        }
        return "Noted! you are punched-in. You may start your work.";
      } else {
        if (!leave) {
          throw new CustomError("no punch found with this punchId", 422);
        }
        if (!leave.punchInTime) {
          throw new CustomError("please first punch-in to punch-out", 422);
        }
        if (leave.punchOutTime && leave.punchOutTime !== 0) {
          throw new CustomError("you already punched-out!", 422);
        }
        leave.punchOutTime = Date.now();
        await leave.save();
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
      populate: "userId"
    });
    data.map((da) => {
      da.set("isOnLeave", false, {strict: false});
      return da
    })
    if (data.length < numberOfData) {
      const historyData = await findPunchHistories({
        sort: { _id: "asc" },
        limit: numberOfData - data.length,
        skip: 0,
        select: {
          _id: 1,
          punchCount: 1,
          punchInTime: 1,
          punchOutTime: 1,
          userId: 1,
          isOnLeave: 1
        },
        populate: "userId"
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
        punchCount: 1,
        punchInTime: 1,
        punchOutTime: 1,
      },
      populate: "userId"
    });
    return {
      data,
      currentPage: pageParams,
      nextPage: data.length !== 0 ? pageParams + numberOfData : null,
    };
  }
};
