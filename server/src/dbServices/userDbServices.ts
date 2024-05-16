import User from "../model/User";

export const findOneUser = async (query: {
  externalId?: string;
  _id?: string;
  email?: string;
  name?: string;
  leaves_remaining?: number;
}) => {
  try {
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
}) => {
  try {
    const result = await User.create(data);
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
