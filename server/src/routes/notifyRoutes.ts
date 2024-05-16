import { Router } from "express";
import { notificationCount } from "../controllers/notificationController";

const router = Router();

router.get("/notifyCount", notificationCount)

export default router;