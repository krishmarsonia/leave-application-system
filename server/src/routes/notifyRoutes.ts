import { Router } from "express";
import {
  getNotificationsController,
  setNotificationsController,
} from "../controllers/notificationController";

const router = Router();

router.get("/getNotifications/:userId", getNotificationsController);

router.put("/setNotifications/:userId", setNotificationsController);

export default router;
