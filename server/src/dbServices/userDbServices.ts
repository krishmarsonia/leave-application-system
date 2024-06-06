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

export const findUsers = async (props?: {
  query?: {
    externalId?: string;
    _id?: string;
    email?: string;
    name?: string;
    leaves_remaining?: number;
    isAdmin?: boolean;
    birthday?: number;
  };
  select?: {
    externalId?: 1 | 0;
    _id?: 1 | 0;
    email?: 1 | 0;
    name?: 1 | 0;
    leaves_remaining?: 1 | 0;
    isAdmin?: 1 | 0;
    birthday?: 1 | 0;
    profileImage?: 1 | 0;
  };
  gte?: number;
  gteWhere?: string;
  lte?: number;
  lteWhere?: string;
}) => {
  try {
    const query = props?.query;
    const gte = props?.gte;
    const gteWhere = props?.gteWhere;
    const lte = props?.lte;
    const lteWhere = props?.lteWhere;
    const select = props?.select;
    let users;
    users = User.find();
    if (query) {
      console.log("there is a query");
      users = User.find(query);
    }
    if (gte && gteWhere) {
      users = users.where(gteWhere).gte(gte);
    }
    if (lte && lteWhere) {
      users = users.where(lteWhere).lte(lte);
    }
    if (select) {
      users = users.select(select);
    }
    console.log(users.getQuery());
    return await users;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
