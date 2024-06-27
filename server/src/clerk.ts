import dotenv from "dotenv";
import { createClerkClient } from "@clerk/clerk-sdk-node";

dotenv.config();

export const clerk = createClerkClient({secretKey: process.env.CLERK_BACKEND_SECRET});
