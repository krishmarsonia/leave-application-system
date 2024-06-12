import Ably from "ably";

import * as dotenv from "dotenv";
dotenv.config();

import { CustomError } from "../custom/CustomError";
console.log(process.env.ABLYKEY);
if(!process.env.ABLYKEY){
  throw new CustomError("ABLYKEY not found in environment variables.", 422)
}
export const ably = new Ably.Realtime(process.env.ABLYKEY);

ably.connection.once("connected", () => {
  console.log("ably connected");
});

