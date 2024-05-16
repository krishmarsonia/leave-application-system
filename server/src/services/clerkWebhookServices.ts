import { Webhook, WebhookRequiredHeaders } from "svix";

import { createOneUser, findOneUser } from "../dbServices/userDbServices";

export const clerkWebHookService = async (
  payloadString: any,
  svixHeaders: WebhookRequiredHeaders
) => {
  try {
    const wh = new Webhook(process.env.SIGNING_SECRET_NGROK!);
    const evt = wh.verify(payloadString, svixHeaders) as any;
    const { id, ...attributes } = evt.data;
    const eventType = evt.type; //"user.created", "user.updated"
    const existingUser = await findOneUser({ externalId: id });
    if (!existingUser) {
      await createOneUser({
        email: attributes.email_addresses[0].email_address,
        externalId: id,
        name: attributes.first_name + " " + attributes.last_name,
      });
    } else {
      existingUser.email = attributes.email_addresses[0].email_address;
      existingUser.name = attributes.first_name + " " + attributes.last_name;
      await existingUser.save();
    }
  } catch (error: any) {
    if(!error.statusCode){
        error.statusCode = 422;
    }
    throw error;
  }
};
