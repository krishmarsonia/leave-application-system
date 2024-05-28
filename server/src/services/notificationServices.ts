import { CustomError } from "../custom/CustomError";
import {
  findNotifications,
  updateManyNotifications,
} from "../dbServices/notificationDBServices";
import { findOneUser } from "../dbServices/userDbServices";

export const getNotificationsServices = async (userId: string) => {
  try {
    console.log("notification");
    if (!userId) {
      throw new CustomError("userId not passed", 422);
    }
    const user = await findOneUser({ externalId: userId });
    const leaves = await findNotifications({ userId: user?._id.toString() });
    return leaves;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const setNotificationsServices = async (
  userId: string,
  data: {
    message?: string;
    opened?: boolean;
    route?: string;
    seen?: boolean;
    userId?: string;
    _id?: string;
  }
) => {
  try {
    if (!userId || !data || userId === "") {
      throw new CustomError("parameters not passed", 422);
    }
    const user = await findOneUser({ externalId: userId });
    const result = await updateManyNotifications(
      { userId: user?._id.toString() },
      data
    );
    return result;
  } catch (error: any) {
    if(!error.statusCode){
      error.statusCode = 422;
    }
    throw error;
  }
};
