"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationController_1 = require("../controllers/notificationController");
const router = (0, express_1.Router)();
router.get("/getNotifications/:userId", notificationController_1.getNotificationsController);
router.put("/setNotifications/:userId", notificationController_1.setNotificationsController);
exports.default = router;
