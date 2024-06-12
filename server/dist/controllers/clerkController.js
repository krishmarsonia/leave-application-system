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
exports.getTodaysBirthdayController = exports.clerkWebHook = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const clerkWebhookServices_1 = require("../services/clerkWebhookServices");
const CustomError_1 = require("../custom/CustomError");
dotenv_1.default.config();
const clerkWebHook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(16, req.headers.referer, req.path);
        const payloadString = req.body;
        const svixHeaders = req.headers;
        if (!payloadString || !svixHeaders) {
            throw new CustomError_1.CustomError("parameteres not passed", 422);
        }
        yield (0, clerkWebhookServices_1.clerkWebHookService)(payloadString, svixHeaders);
        return res.status(200).json({
            success: true,
            message: "webhook received",
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
});
exports.clerkWebHook = clerkWebHook;
const getTodaysBirthdayController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const birthdayList = yield (0, clerkWebhookServices_1.getTodaysBirthdayServices)();
        res.json(birthdayList);
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
});
exports.getTodaysBirthdayController = getTodaysBirthdayController;
