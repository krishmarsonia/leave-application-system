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
exports.setNotificationsController = exports.getNotificationsController = void 0;
const CustomError_1 = require("../custom/CustomError");
const notificationServices_1 = require("../services/notificationServices");
const getNotificationsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            throw new CustomError_1.CustomError("parameters in the body not passed", 422);
        }
        const result = yield (0, notificationServices_1.getNotificationsServices)(userId);
        return res.json(result);
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
});
exports.getNotificationsController = getNotificationsController;
const setNotificationsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const data = req.body;
        if (!userId || !data || userId === "") {
            throw new CustomError_1.CustomError("parameters not recived in either params or body", 422);
        }
        const result = yield (0, notificationServices_1.setNotificationsServices)(userId, data);
        return res.json(result);
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
});
exports.setNotificationsController = setNotificationsController;
