import dotenv from "dotenv";
import { WebhookRequiredHeaders } from "svix";
import { NextFunction, Request, Response } from "express";

import { clerkWebHookService } from "../services/clerkWebhookServices";

dotenv.config();

export const clerkWebHook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payloadString = req.body;
    const svixHeaders = req.headers as unknown as WebhookRequiredHeaders;
    await clerkWebHookService(payloadString, svixHeaders);
    // const wh = new Webhook(process.env.SIGNING_SECRET_NGROK!);
    // const evt = wh.verify(payloadString, svixHeaders) as any;
    // const { id, ...attributes } = evt.data;
    // const eventType = evt.type; //"user.created", "user.updated"
    // const existingUser = await User.findOne({ externalId: id });
    // if (!existingUser) {
    //   await User.create({
    //     email: attributes.email_addresses[0].email_address,
    //     externalId: id,
    //     name: attributes.first_name + " " + attributes.last_name,
    //   });
    // } else {
    //   existingUser.email = attributes.email_addresses[0].email_address;
    //   existingUser.name = attributes.first_name + " " + attributes.last_name;
    //   await existingUser.save();
    // }
    return res.status(200).json({
      success: true,
      message: "webhook received",
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
