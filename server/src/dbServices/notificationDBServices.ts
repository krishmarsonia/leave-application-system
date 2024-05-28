import { CustomError } from "../custom/CustomError";
import Notification from "../model/Notification";

export const createNotification = async (
  data:
    | {
        userId: string;
        message: string;
        route?: string;
      }
    | { userId: string; message: string; route?: string }[]
) => {
  try {
    if (!data) {
      throw new CustomError("parameters not passed", 422);
    }
    const result = await Notification.create(data);
    return result;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const findNotifications = async (query: {
  _id?: string;
  userId?: string;
  message?: string;
  route?: string;
  opened?: boolean;
  seen?: boolean;
}) => {
  const result = await Notification.find(query);
  return result;
};

export const updateManyNotifications = async (
  query: {
    _id?: string;
    userId?: string;
    message?: string;
    route?: string;
    opened?: boolean;
    seen?: boolean;
  },
  data: {
    _id?: string;
    userId?: string;
    message?: string;
    route?: string;
    opened?: boolean;
    seen?: boolean;
  }
) => {
  try {
    if(!query || !data){
      throw new CustomError("query or data is not passed as parameter", 422);
    }
    const result = await Notification.updateMany(query, data);
    return result;
  } catch (error: any) {
    if(!error.statusCode){
      error.statusCode = 422;
    }
    throw error;
  }
};
