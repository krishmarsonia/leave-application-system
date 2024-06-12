"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaveController_1 = require("../controllers/leaveController");
const clerkVerify_1 = require("../middleware/clerkVerify");
const router = (0, express_1.Router)();
router.post("/postCreateLeave", leaveController_1.postCreateLeaveController);
router.get("/getLeaves/:userId", clerkVerify_1.auth, leaveController_1.getLeavesController);
router.get("/getAllLeaves", leaveController_1.getAllLeavesController);
router.post("/postActionOnLeave", clerkVerify_1.auth, leaveController_1.postActionOnLeaveController);
exports.default = router;
