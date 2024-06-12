"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testControllers_1 = require("../controllers/testControllers");
const router = (0, express_1.Router)();
router.get("/createPunch", testControllers_1.createPunchController);
router.get("/updatePunch", testControllers_1.updatePunchController);
exports.default = router;
