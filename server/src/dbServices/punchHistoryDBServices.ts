import { CustomError } from "../custom/CustomError";
import PunchHistory from "../model/punchHistory";

export const createPunchHistory = async (
  data:
    | {
        userId: string;
        punchInTime: number;
        punchOutTime: number;
        isOnLeave: boolean;
        date: number;
      }
    | {
        userId: string;
        punchInTime: number;
        punchOutTime: number;
        isOnLeave: boolean;
        date: number;
      }[]
) => {
  try {
    if (!data) {
      throw new CustomError("data not provided", 422);
    }
    const result = await PunchHistory.create(data);
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const findOnePunchHistory = async ({
  query,
  sort,
}: {
  query?: {
    userId: string;
    punchInTime: number;
    punchOutTime: number;
    isOnLeave: boolean;
    date: number;
  };
  sort?: {
    userId?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
    punchInTime?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
    punchOutTime?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
    date?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
    _id?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
  };
}) => {
  try {
    const result = await PunchHistory.findOne(query).sort(sort);
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const findPunchHistories = async ({
  query,
  sort,
  limit,
  skip,
  select,
  populate,
  gte,
  lte,
  gteWhere,
  lteWhere
}: {
  query?: {
    userId: string;
    punchInTime: number;
    punchOutTime: number;
    isOnLeave: boolean;
    date: number;
  };
  sort?: {
    userId?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
    punchInTime?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
    punchOutTime?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
    date?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
    _id?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
  };
  select?: {
    userId?: 1 | 0;
    punchInTime?: 1 | 0;
    punchOutTime?: 1 | 0;
    date?: 1 | 0;
    _id?: 1 | 0;
    isOnLeave?: 1 | 0;
  };
  limit?: number;
  skip?: number;
  populate?: [string] | string;
  gte?: number;
  lte?: number
  gteWhere?: string;
  lteWhere? : string;
}) => {
  try {
    let data;
    // if (query) {
    //   if (limit && skip) {
    //     data = await PunchHistory.find(query)
    //       .sort(sort)
    //       .limit(limit)
    //       .skip(skip).select(select)
    //   }
    //   data = await PunchHistory.find(query).sort(sort);
    // } else {
    //   if (limit && skip) {
    //     data = await PunchHistory.find().sort(sort).limit(limit).skip(skip);
    //   } else {
    //     data = await PunchHistory.find().sort(sort);
    //   }
    // }
    data = PunchHistory.find();
    if (query) {
      data = PunchHistory.find(query);
    }
    if(gte && gteWhere){
      data = data.where(gteWhere).gte(gte);
    }
    if(lte && lteWhere){
      data = data.where(lteWhere).lte(lte);
    }
    if (sort) {
      data = data.sort(sort);
    }
    if (skip) {
      data = data.skip(skip);
    }
    if (limit) {
      data = data.limit(limit);
    }
    if (select) {
      data = data.select(select);
    }
    if (populate) {
      data = data.populate(populate);
    }
    return await data;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
