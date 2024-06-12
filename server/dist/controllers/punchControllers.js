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
exports.punchCRONJobController = exports.weeklyPunchController = exports.punchDisplayController = exports.punchController = void 0;
const CustomError_1 = require("../custom/CustomError");
const punchServices_1 = require("../services/punchServices");
const punchController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mode } = req.body;
        const userId = req.userId;
        if (!userId) {
            throw new CustomError_1.CustomError("userId not provided in request", 422);
        }
        if (mode === "punch-in" || mode === "punch-out") {
            const punchedResult = yield (0, punchServices_1.punchServices)(mode, userId);
            return res.json({ message: punchedResult });
        }
        else {
            throw new CustomError_1.CustomError("appropriate mode of punch is not provided", 422);
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
});
exports.punchController = punchController;
const punchDisplayController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.params;
        if (page === "") {
            throw new CustomError_1.CustomError("Page Params is of empty string passed in params", 422);
        }
        const numPageParams = Number(page);
        const data = yield (0, punchServices_1.punchDisplayServices)(numPageParams);
        return res.json(data);
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
});
exports.punchDisplayController = punchDisplayController;
const weeklyPunchController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { weekStart, weekEnd } = req.query;
        if (!weekStart || !weekEnd) {
            throw new CustomError_1.CustomError("params in query not provided", 422);
        }
        const numWeekStart = Number(weekStart);
        const numWeekEnd = Number(weekEnd);
        if (Number.isNaN(numWeekEnd) || Number.isNaN(numWeekStart)) {
            throw new CustomError_1.CustomError("params are not of number", 422);
        }
        const result = yield (0, punchServices_1.weeklyPunchServices)(numWeekStart, numWeekEnd);
        console.log(result);
        res.json(result);
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
});
exports.weeklyPunchController = weeklyPunchController;
const punchCRONJobController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, punchServices_1.punchCRONJobService)();
        res.status(200);
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
});
exports.punchCRONJobController = punchCRONJobController;
