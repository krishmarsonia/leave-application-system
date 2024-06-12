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
exports.postActionOnLeaveServices = exports.getAllLeavesServices = exports.getLeaveServices = exports.postCreateLeaveServices = void 0;
const CustomError_1 = require("../custom/CustomError");
const leaveDBServices_1 = require("../dbServices/leaveDBServices");
const notificationDBServices_1 = require("../dbServices/notificationDBServices");
const userDbServices_1 = require("../dbServices/userDbServices");
const timeCalculations_1 = require("../util/timeCalculations");
const leaveCalculation_1 = require("../util/leaveCalculation");
const ablyConnection_1 = require("../connections/ablyConnection");
const postCreateLeaveServices = (startDate, endDate, leaveType, reason, empId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!startDate || !endDate || !leaveType || !reason || !empId) {
        throw new Error("parameters not passed");
    }
    try {
        const findUser = yield (0, userDbServices_1.findOneUser)({ externalId: empId });
        if (!(findUser === null || findUser === void 0 ? void 0 : findUser._id)) {
            throw new CustomError_1.CustomError("user not found", 404);
        }
        yield (0, leaveDBServices_1.createLeave)({
            employeeId: findUser === null || findUser === void 0 ? void 0 : findUser._id.toString(),
            endDate: endDate,
            leaveType: leaveType,
            reason: reason,
            startDate: startDate,
        });
        const admins = yield (0, userDbServices_1.findUsers)({ query: { isAdmin: true } });
        const notifications = [];
        admins.map((admin) => {
            const tempNoti = {
                userId: admin._id.toString(),
                message: `${findUser.name} has applied for leave for a time period of ${(0, timeCalculations_1.timeCalculations)(startDate, endDate)}`,
                route: "/adminReview",
            };
            notifications.push(tempNoti);
        });
        yield (0, notificationDBServices_1.createNotification)(notifications);
        const channel = ablyConnection_1.ably.channels.get("leaveUpdated");
        yield channel.publish("notification-isAdmin-true", "this is only for admins");
        return empId;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.postCreateLeaveServices = postCreateLeaveServices;
const getLeaveServices = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId) {
            const newError = new Error("userId not passed");
            newError.statusCode = 422;
            throw newError;
        }
        const user = yield (0, userDbServices_1.findOneUser)({ externalId: userId });
        if (!user) {
            const newError = new Error("user not found");
            newError.statusCode = 404;
            throw newError;
        }
        const leavesResult = yield (0, leaveDBServices_1.findLeaves)({
            query: { employeeId: user._id.toString() },
        }).populate("approvedBy");
        return leavesResult;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.getLeaveServices = getLeaveServices;
const getAllLeavesServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, leaveDBServices_1.findLeaves)({ populate: "employeeId" });
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.getAllLeavesServices = getAllLeavesServices;
const postActionOnLeaveServices = (leaveId, approve, adminExternalId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(leaveId, approve, adminExternalId);
        if (!leaveId || !adminExternalId) {
            throw new CustomError_1.CustomError("parameters not passed", 422);
        }
        const admin = yield (0, userDbServices_1.findOneUser)({ externalId: adminExternalId });
        if (!admin) {
            throw new CustomError_1.CustomError("No admin found with that userId", 404);
        }
        const leave = yield (0, leaveDBServices_1.updateLeave)({ _id: leaveId }, approve
            ? {
                approved: true,
                cancelled: false,
                approvedBy: admin._id.toString(),
            }
            : {
                approved: false,
                cancelled: true,
                approvedBy: admin._id.toString(),
            });
        if (!leave) {
            throw new CustomError_1.CustomError("leave was not able to be updated", 422);
        }
        const employeeUser = yield (0, userDbServices_1.findOneUser)({
            _id: (_a = leave.employeeId) === null || _a === void 0 ? void 0 : _a.toString(),
        });
        if (!employeeUser) {
            throw new CustomError_1.CustomError("User not found", 404);
        }
        if (approve === true) {
            const leavesCalc = (0, leaveCalculation_1.leaveCalculation)(leave.startDate, leave.endDate);
            employeeUser.leaves_remaining =
                employeeUser.leaves_remaining - leavesCalc;
            yield employeeUser.save();
        }
        yield (0, notificationDBServices_1.createNotification)({
            userId: employeeUser._id.toString(),
            message: approve
                ? `Your leave application for ${(0, timeCalculations_1.timeCalculations)(leave.startDate, leave.endDate)} has been approved ${admin === null || admin === void 0 ? void 0 : admin.name}`
                : `Your leave application for ${(0, timeCalculations_1.timeCalculations)(leave.startDate, leave.endDate)} has been rejcted ${admin === null || admin === void 0 ? void 0 : admin.name}`,
            route: "/userLeaves",
        });
        const channel = ablyConnection_1.ably.channels.get("leaveUpdated");
        yield channel.publish(`notify-user-${employeeUser.externalId}`, {
            status: approve ? "accepted" : "rejected",
        });
        return employeeUser;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.postActionOnLeaveServices = postActionOnLeaveServices;
