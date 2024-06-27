import { Webhook, WebhookRequiredHeaders } from "svix";

import {
  createOneUser,
  findOneUser,
  findUsers,
} from "../dbServices/userDbServices";

export const clerkWebHookService = async (
  payloadString: any,
  svixHeaders: WebhookRequiredHeaders
) => {
  try {
    if (!payloadString || !svixHeaders) {
      throw new Error("parameters not passed");
    }
    console.log(process.env.SIGNING_SECRET_NGROK!);
    const wh = new Webhook(process.env.SIGNING_SECRET_NGROK!);
    const evt = wh.verify(payloadString, svixHeaders) as any;
    const { id, ...attributes } = evt.data;
    const eventType = evt.type; //"user.created", "user.updated"
    //set {isAdmin: false in public route}
    const existingUser = await findOneUser({ externalId: id });
    if (!existingUser) {
      await createOneUser({
        email: attributes.email_addresses[0].email_address,
        externalId: id,
        name: attributes.first_name + " " + attributes.last_name,
        profileImage: attributes.profile_image_url,
      });
    } else {
      existingUser.email = attributes.email_addresses[0].email_address;
      existingUser.name = attributes.first_name + " " + attributes.last_name;
      existingUser.profileImage = attributes.profile_image_url;
      await existingUser.save();
    }
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

export const getTodaysBirthdayServices = async () => {
  try {
    const startingDay = new Date();

    const wholeBirthdayList = await findUsers({
      select: {
        _id: 1,
        birthday: 1,
        name: 1,
        profileImage: 1,
      },
    });
    const birthdayList = wholeBirthdayList.filter((wbl) => {
      if (wbl.birthday) {
        const date = new Date(wbl.birthday);
        if (
          date.getMonth() === startingDay.getMonth() &&
          date.getDate() === startingDay.getDate()
        ) {
          return true;
        }
        return false;
      }
      return false;
    });
    return birthdayList;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
