import { CustomError } from "../custom/CustomError";
import Punch from "../model/Punch";

export const createPunch = async (
  data:
    | {
        userId: string;
        punchInTime: number;
        punchCount: number;
        punchOutTime?: number;
      }
    | {
        userId: string;
        punchInTime: number;
        punchCount: number;
        punchOutTime?: number;
      }[]
) => {
  try {
    if (!data) {
      throw new CustomError("no data provided in parameters", 422);
    }
    const result = await Punch.create(data);
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const getPunches = async ({
  query,
  sort,
  limit,
  skip,
  populate,
}: {
  query?: {
    userId?: string;
    punchInTime?: number;
    punchOutTime?: number;
    punchCount?: number;
    _id?: string;
  };
  sort?: {
    userId?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
    punchInTime?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
    punchOutTime?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
    punchCount?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
    _id?: 1 | -1 | "ascending" | "asc" | "descending" | "desc";
  };
  skip?: number;
  limit?: number;
  populate?: [string] | string;
}) => {
  try {
    let result;
    // if (query) {
    //   if (skip && limit) {
    //     result = await Punch.find(query).sort(sort).skip(skip).limit(limit);
    //   } else {
    //     result = await Punch.find(query).sort(sort);
    //   }
    // } else {
    //   if (skip && limit) {
    //     result = await Punch.find().sort(sort).skip(skip).limit(limit);
    //   } else {
    //     result = await Punch.find().sort(sort);
    //   }
    // }
    result = Punch.find();
    if (query) {
      result = Punch.find(query);
    }
    if (sort) {
      result = result.sort(sort);
    }
    if (skip) {
      result = result.skip(skip);
    }
    if (limit) {
      result = result.limit(limit);
    }
    if (populate) {
      result = result.populate(populate);
    }
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const deletePunches = async (
  deleteAll: boolean,
  query?: {
    userId?: string;
    punchInTime?: number;
    punchOutTime?: number;
    _id?: string;
  }
) => {
  try {
    let result;
    if (query) {
      result = await Punch.deleteMany(query);
    } else {
      if (deleteAll === true) {
        result = await Punch.deleteMany();
      } else {
        throw new CustomError(
          "Trying to delete all punches without deleteAll Flag",
          422
        );
      }
    }
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const updatePunches = async (
  query: {
    userId?: string | {};
    punchInTime?: number;
    punchOutTime?: number;
    _id?: string;
  },
  data:
    | {
        userId?: string | {};
        punchInTime?: number;
        punchOutTime?: number;
      }
    | {
        userId?: string | {};
        punchInTime?: number;
        punchOutTime?: number;
      }[]
) => {
  try {
    if (!query || !data) {
      throw new CustomError("query or data not passed in the parameters", 422);
    }
    const result = await Punch.updateMany(query, data);
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const findPunch = async (query?: {
  userId?: string;
  punchInTime?: number;
  punchOutTime?: number;
  _id?: string;
}) => {
  try {
    if (!query) {
      throw new CustomError("query is not provided in the parameters", 422);
    }
    const result = await Punch.findOne(query);
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
