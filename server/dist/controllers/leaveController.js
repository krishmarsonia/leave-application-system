"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postActionOnLeaveController = exports.getAllLeavesController = exports.getLeavesController = exports.postCreateLeaveController = void 0;
const CustomError_1 = require("../custom/CustomError");
const leaveServices_1 = require("../services/leaveServices");
const postCreateLeaveController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate, leaveType, reason, employeeId } = req.body;
        if (!startDate || !endDate || !leaveType || !reason || !employeeId) {
            throw new CustomError_1.CustomError("appropriate parameters not passed", 422);
        }
        if (typeof startDate !== "number" ||
            typeof endDate !== "number" ||
            !["selectedHours", "fullDay", "SeveralDays"].includes(leaveType) ||
            typeof reason !== "string" ||
            typeof employeeId !== "string") {
            throw new CustomError_1.CustomError("type of the the parameters are not appropriate", 422);
        }
        yield (0, leaveServices_1.postCreateLeaveServices)(startDate, endDate, leaveType, reason, employeeId);
        return res.status(201).json(employeeId);
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
});
exports.postCreateLeaveController = postCreateLeaveController;
const getLeavesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getLeavesController");
    try {
        const { userId } = req.params;
        if (userId === "") {
            throw new CustomError_1.CustomError("userId not revived", 422);
        }
        const result = yield (0, leaveServices_1.getLeaveServices)(userId);
        return res.json(result);
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
});
exports.getLeavesController = getLeavesController;
const getAllLeavesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getAllLeavesController");
    try {
        const result = yield (0, leaveServices_1.getAllLeavesServices)();
        return res.json(result);
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
});
exports.getAllLeavesController = getAllLeavesController;
const postActionOnLeaveController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("postActionOnLeaveController");
    try {
        const { data } = req.body;
        if (!data) {
            throw new CustomError_1.CustomError("parameters not recived", 422);
        }
        if (data.leaveId === null) {
            throw new CustomError_1.CustomError("employeeId not passed", 422);
        }
        if (!req.userId) {
            throw new CustomError_1.CustomError("userId not assigned", 422);
        }
        const result = yield (0, leaveServices_1.postActionOnLeaveServices)(data.leaveId, data.approve, req.userId);
        if (!result) {
            throw new CustomError_1.CustomError("result not returened", 422);
        }
        console.log("success");
        return res.json(result);
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
});
exports.postActionOnLeaveController = postActionOnLeaveController;
