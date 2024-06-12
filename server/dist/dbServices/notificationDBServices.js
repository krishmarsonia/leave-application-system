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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManyNotifications = exports.findNotifications = exports.createNotification = void 0;
const CustomError_1 = require("../custom/CustomError");
const Notification_1 = __importDefault(require("../model/Notification"));
const createNotification = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data) {
            throw new CustomError_1.CustomError("parameters not passed", 422);
        }
        const result = yield Notification_1.default.create(data);
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.createNotification = createNotification;
const findNotifications = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Notification_1.default.find(query);
    return result;
});
exports.findNotifications = findNotifications;
const updateManyNotifications = (query, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!query || !data) {
            throw new CustomError_1.CustomError("query or data is not passed as parameter", 422);
        }
        const result = yield Notification_1.default.updateMany(query, data);
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.updateManyNotifications = updateManyNotifications;
