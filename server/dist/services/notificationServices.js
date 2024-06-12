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
exports.setNotificationsServices = exports.getNotificationsServices = void 0;
const CustomError_1 = require("../custom/CustomError");
const notificationDBServices_1 = require("../dbServices/notificationDBServices");
const userDbServices_1 = require("../dbServices/userDbServices");
const getNotificationsServices = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("notification");
        if (!userId) {
            throw new CustomError_1.CustomError("userId not passed", 422);
        }
        const user = yield (0, userDbServices_1.findOneUser)({ externalId: userId });
        const leaves = yield (0, notificationDBServices_1.findNotifications)({ userId: user === null || user === void 0 ? void 0 : user._id.toString() });
        return leaves;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.getNotificationsServices = getNotificationsServices;
const setNotificationsServices = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId || !data || userId === "") {
            throw new CustomError_1.CustomError("parameters not passed", 422);
        }
        const user = yield (0, userDbServices_1.findOneUser)({ externalId: userId });
        const result = yield (0, notificationDBServices_1.updateManyNotifications)({ userId: user === null || user === void 0 ? void 0 : user._id.toString() }, data);
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.setNotificationsServices = setNotificationsServices;
