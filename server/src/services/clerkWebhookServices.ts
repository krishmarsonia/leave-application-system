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
    const endingDay = new Date();
    startingDay.setHours(0, 0, 0, 0);
    endingDay.setHours(11, 59, 59, 999);
    const birthdayList = await findUsers({
      gteWhere: "birthday",
      gte: startingDay.getTime(),
      lteWhere: "birthday",
      lte: endingDay.getTime(),
    });
    return birthdayList;
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
