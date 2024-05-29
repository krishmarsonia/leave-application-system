import { CustomError } from "../custom/CustomError";
import Punch from "../model/Punch";

export const createPunch = async (
  data:
    | {
        userId: string;
        punchInTime?: number;
        punchOutTime?: number;
        date: number;
      }
    | {
        userId: string;
        punchInTime?: number;
        punchOutTime?: number;
        date: number;
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

export const getPunches = async (query?: {
  userId?: string;
  punchInTime?: number;
  punchOutTime?: number;
  date?: number;
  _id?: string;
}) => {
  try {
    let result;
    if (query) {
      result = await Punch.find(query);
    } else {
      result = await Punch.find();
    }
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const deletePunches = async (query: {
  userId?: string;
  punchInTime?: number;
  punchOutTime?: number;
  date?: number;
  _id?: string;
}) => {
  try {
    if (!query) {
      throw new CustomError("query not passed in the parameter", 422);
    }
    const result = await Punch.deleteMany(query);
    return result;
  } catch (error: any) {
    if(!error.statusCode){
      error.statusCode = 422;
    }
    throw error;
  }
};
