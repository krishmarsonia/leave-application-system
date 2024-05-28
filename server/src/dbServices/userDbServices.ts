import { CustomError } from "../custom/CustomError";
import User from "../model/User";

export const findOneUser = async (query: {
  externalId?: string;
  _id?: string;
  email?: string;
  name?: string;
  leaves_remaining?: number;
  isAdmin?: boolean;
}) => {
  try {
    if (!query) {
      throw new CustomError("query not passed", 422);
    }
    const result = await User.findOne(query);
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const createOneUser = async (data: {
  externalId: string;
  email: string;
  name: string;
  profileImage?: string;
}) => {
  try {
    if (!data) {
      throw new CustomError("data not passed", 422);
    }
    const result = await User.create(data);
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const findUsers = async (query?: {
  externalId?: string;
  _id?: string;
  email?: string;
  name?: string;
  leaves_remaining?: number;
  isAdmin?: boolean;
}) => {
  try {
    if (!query) {
      throw new CustomError("no query was present in parameters", 422);
    }
    const users = await User.find(query);
    return users;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
