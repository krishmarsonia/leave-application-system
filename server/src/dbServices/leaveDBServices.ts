import { CustomError } from "../custom/CustomError";
import Leave from "../model/Leave";
import { LeaveInterface, PartialNull } from "../types/Leave";

export const createLeave = async (data: LeaveInterface) => {
  try {
    if (!data) {
      throw new CustomError("data not passed", 422);
    }
    const result = await Leave.create(data);
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
      throw error;
    }
  }
};

export const findLeaves = (props: {
  query?: PartialNull<LeaveInterface>;
  populate?: string | string[];
}) => {
  try {
    const { query, populate } = props;
    let result;
    if (query) {
      result = Leave.find(query);
    } else {
      result = Leave.find();
    }
    if (populate) {
      return result.populate(populate);
    } else {
      return result;
    }
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const updateLeave = async (
  query: PartialNull<LeaveInterface>,
  data: PartialNull<LeaveInterface>
) => {
  try {
    const result = await Leave.findOneAndUpdate(query, data, { new: true });
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const findLeave = async (query: PartialNull<LeaveInterface>) => {
  try {
    if (!query) {
      throw new CustomError("query was not passed in the parameters", 422);
    }
    const result = await Leave.findOne(query);
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
