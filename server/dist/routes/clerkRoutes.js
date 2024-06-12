"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clerkController_1 = require("../controllers/clerkController");
const body_parser_1 = __importDefault(require("body-parser"));
const router = (0, express_1.Router)();
router.post("/api/webhook", body_parser_1.default.raw({ type: "application/json" }), clerkController_1.clerkWebHook);
router.get("/getTodaysBirthday", clerkController_1.getTodaysBirthdayController);
exports.default = router;
