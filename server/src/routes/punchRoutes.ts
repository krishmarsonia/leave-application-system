import { Router } from "express";
import { auth } from "../middleware/clerkVerify";
import {
  punchCRONJobController,
  punchController,
  punchDisplayController,
  weeklyPunchController,
} from "../controllers/punchControllers";

const router = Router();

router.post("/punch", auth, punchController);

router.get("/punchDisplay/:page", punchDisplayController);

router.get("/weeklyPunch", weeklyPunchController);

router.get("/punchcronjob", punchCRONJobController);

export default router;
