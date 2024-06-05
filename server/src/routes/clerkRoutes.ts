import { Router } from "express";
import { clerkWebHook, getTodaysBirthdayController } from "../controllers/clerkController";
import bodyParser from "body-parser";

const router = Router();

router.post(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  clerkWebHook
);

router.get("/getTodaysBirthday", getTodaysBirthdayController);
export default router;
