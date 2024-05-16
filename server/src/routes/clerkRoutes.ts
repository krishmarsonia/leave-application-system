import { Router } from "express";
import { clerkWebHook } from "../controllers/clerkController";
import bodyParser from "body-parser";

const router = Router();

router.post("/api/webhook",bodyParser.raw({type: "application/json"}),clerkWebHook);

export default router;