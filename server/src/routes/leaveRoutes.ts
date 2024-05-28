import { Router } from "express";
import {
  getAllLeavesController,
  getLeavesController,
  postActionOnLeaveController,
  postCreateLeaveController,
} from "../controllers/leaveController";
import { auth } from "../middleware/clerkVerify";

const router = Router();

router.post("/postCreateLeave", postCreateLeaveController);

router.get("/getLeaves/:userId", auth, getLeavesController);

router.get("/getAllLeaves", getAllLeavesController);

router.post("/postActionOnLeave", auth, postActionOnLeaveController);

export default router;
